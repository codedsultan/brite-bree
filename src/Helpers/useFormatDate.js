export default function useFormatDate() {
    function formatDate(dateString) {
        const date = new Date(dateString)
        // Then specify how you want your dates to be formatted
        return new Intl.DateTimeFormat("default", { dateStyle: "long" }).format(
            date
        )
    }

    return { formatDate }
}
