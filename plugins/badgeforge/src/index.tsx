import { storage } from "@vendetta/plugin";
import { findByProps, findByStoreName, findByTypeNameAll } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { findInReactTree } from "@vendetta/utils";
import Settings from "./Settings";

storage.enabled ??= true;
storage.badges ??= "Early Supporter|#5865f2|#ffffff\nVerified Developer|#3ba55c|#ffffff";
storage.accountAge ??= "2019-06-12";
storage.games ??= "Minecraft|1240\nFortnite|380";

const TagModule = findByProps("getBotLabel");
let unpatches: (() => void)[] = [];

function getSelfId() {
    try { return findByStoreName("UserStore")?.getCurrentUser?.()?.id; }
    catch { return undefined; }
}

function getShowcaseTags() {
    const tags: { text: string; backgroundColor: string; textColor: string }[] = [];
    const add = (text: string, backgroundColor = "#5865f2", textColor = "#ffffff") => {
        if (text.trim()) tags.push({ text: text.trim().slice(0, 32), backgroundColor, textColor });
    };

    if (storage.enabled) {
        String(storage.badges || "").split(/\r?\n/).forEach((line: string) => {
            const [label, bg, fg] = line.split("|");
            add(label || "", /^#[0-9a-f]{6}$/i.test(bg || "") ? bg : "#5865f2",
                /^#[0-9a-f]{6}$/i.test(fg || "") ? fg : "#ffffff");
        });
        if (storage.accountAge) add("Since " + String(storage.accountAge).slice(0, 10), "#3b3d45");
        String(storage.games || "").split(/\r?\n/).forEach((line: string) => {
            const [game, hours] = line.split("|");
            if (game && hours) add(game.trim() + " · " + hours.trim() + "h", "#2b2d31");
        });
    }
    return tags.slice(0, 8);
}

function patchUserRows() {
    if (!TagModule?.default || typeof findByTypeNameAll !== "function") return () => {};
    const rows = findByTypeNameAll("UserRow") || [];
    const cleanups = rows.map((UserRow: any) => after("type", UserRow, ([props]: any[], result: any) => {
        const user = props?.user ?? props?.item?.user;
        const selfId = getSelfId();
        if (!selfId || String(user?.id) !== String(selfId)) return;
        const tags = getShowcaseTags();
        if (!tags.length) return;
        const nameContainer = findInReactTree(result, (node: any) =>
            Array.isArray(node?.props?.children) &&
            node.props.children.some((child: any) =>
                typeof child === "string" || typeof child?.props?.children === "string"
            )
        );
        if (!nameContainer) return;
        if (!Array.isArray(nameContainer.props.children)) nameContainer.props.children = [nameContainer.props.children];
        tags.forEach((tag, index) => {
            nameContainer.props.children.push(
                <TagModule.default key={"badgeforge-" + index} type={0} text={tag.text}
                    textColor={tag.textColor} backgroundColor={tag.backgroundColor} />
            );
        });
    }));
    return () => cleanups.forEach((fn: any) => fn?.());
}

export default {
    onLoad: () => {
        try { unpatches.push(patchUserRows()); }
        catch (error) { console.error("[BadgeForge] profile tag patch failed", error); }
    },
    onUnload: () => {
        unpatches.forEach(fn => { try { fn?.(); } catch {} });
        unpatches = [];
    },
    settings: Settings
};
