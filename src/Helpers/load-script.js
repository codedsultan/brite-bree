export function isScriptLoaded(src) {
    return document.querySelectorAll(`script[src="${src}"]`).length > 0
}

export function loadExternalScript(src, id = null) {
    return new Promise((resolve, reject) => {
        let async_load = function () {
            if (!isScriptLoaded(src)) {
                let first, s
                s = document.createElement("script")
                s.src = src
                s.id = id
                s.type = "text/javascript"
                s.async = true
                s.defer = true
                s.onload = () => {
                    resolve()
                }
                s.onerror = () => {
                    reject()
                }

                first = document.getElementsByTagName("script")[0]

                return first.parentNode.insertBefore(s, first)
            }
        }

        window.attachEvent != null
            ? window.attachEvent("onload", async_load)
            : window.addEventListener("load", async_load, false)
    })
}

export function loadScript(src, cb = undefined) {
    // eslint-disable-line no-param-reassign
    return new Promise(function (resolve, reject) {
        if (document.querySelector('script[src="' + src + '"]')) {
            resolve()

            if (cb !== undefined) cb()

            return
        }

        const el = document.createElement("script")

        el.type = "text/javascript"
        el.async = true
        el.src = src

        el.addEventListener("load", () => {
            resolve()
            if (cb !== undefined) cb()
        })
        el.addEventListener("error", reject)
        el.addEventListener("abort", reject)

        document.head.appendChild(el)
    })
}

export function unloadScript(src) {
    return new Promise(function (resolve, reject) {
        const el = document.querySelector('script[src="' + src + '"]')

        if (!el) {
            reject()
            return
        }

        document.head.removeChild(el)

        resolve()
    })
}
