import antfu from "@antfu/eslint-config";

export default antfu({
        react: false,
        typescript: true,
        stylistic: {
                semi: true,
                quotes: "single",
        },
});
