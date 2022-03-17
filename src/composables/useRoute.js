import ZiggyRoute from "ziggy"
import { Ziggy } from "../ziggy"

export default function useRoute() {
    /**
     * Customize Ziggy's route helper to be more convenient for our use case.
     *
     * @param {String} name Route name.
     * @param {Object} params Route params.
     * @return {String} URL for the route.
     */
    function route(name, params = {}) {
        return ZiggyRoute(name, params, false, Ziggy)
    }

    return { route }
}
