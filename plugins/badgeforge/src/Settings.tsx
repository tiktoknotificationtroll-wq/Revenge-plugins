import { ReactNative as RN } from "@vendetta/metro/common";
import { Forms } from "@vendetta/ui/components";
import { useProxy } from "@vendetta/storage";
import { storage } from "@vendetta/plugin";

const { FormSection, FormSwitchRow, FormInput } = Forms;

export default function Settings() {
    useProxy(storage);
    return (
        <RN.ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 40 }}>
            <FormSection title="BadgeForge" titleStyleType="no_border">
                <FormSwitchRow
                    label="Enable showcase"
                    subLabel="Show your custom tags on your own profile rows in this client"
                    value={storage.enabled}
                    onValueChange={(value: boolean) => storage.enabled = value}
                />
                <FormInput
                    title="Custom badges"
                    placeholder={"One per line: Label|#background|#text\nExample: Early Supporter|#5865f2|#ffffff"}
                    value={storage.badges}
                    onChange={(value: string) => storage.badges = value}
                    multiline
                />
                <FormInput
                    title="Pretend account creation date"
                    placeholder="YYYY-MM-DD"
                    value={storage.accountAge}
                    onChange={(value: string) => storage.accountAge = value}
                />
                <FormInput
                    title="Game playtime"
                    placeholder={"One per line: Game|hours\nExample: Minecraft|1240"}
                    value={storage.games}
                    onChange={(value: string) => storage.games = value}
                    multiline
                />
            </FormSection>
            <FormSection title="Preview and limitations">
                <RN.Text style={{ color: "#b5bac1", paddingHorizontal: 16, paddingVertical: 8 }}>
                    BadgeForge adds custom coloured tags to your own profile rows in this client. The account date and game hours are fictional local display values. They do not change Discord account data, grant official badges, or appear to other people viewing your profile.
                </RN.Text>
            </FormSection>
        </RN.ScrollView>
    );
}
