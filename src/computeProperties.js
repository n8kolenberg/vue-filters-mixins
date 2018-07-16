export const computed = {
    computed: {
        computeReverseText() {
            return this.userInpReverseEx.split("").reverse().join("")
        },

        computeStringCount() {
            return `${this.userInpCountEx} (${this.userInpCountEx.split("").length})`;
        }
    },
}