// import { validateLocaleAndSetLanguage } from "typescript"

export function useSteps(steps, step) {
    function updateStep(id, prop, val) {
        let currentStep = steps.value.find(function (step) {
            return step.id === id
        })

        if (currentStep && currentStep[prop]) {
            currentStep[prop] = val
        }
    }

    function next() {

        step.value++
        updateStep(step.value - 1, "status", "complete")
        updateStep(step.value, "status", "current")
       
    }

    function prev() {
        step.value--
        updateStep(step.value + 1, "status", "upcoming")
        updateStep(step.value, "status", "current")
    }

    return {
        next,
        prev,

    }
}
