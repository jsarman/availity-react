export const FIELD_UPDATE = 'FIELD_UPDATE'
export const SHOW_TOOLTIPS = 'SHOW_TOOLTIPS'

export function updateField(field, value) {
    return {
        type: FIELD_UPDATE,
        field,
        value
    }
}

export function enableTooltips(enableTooltips) {
    return {
        type: SHOW_TOOLTIPS,
        enableTooltips
    }
}