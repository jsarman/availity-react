import { createAction } from 'redux-actions'

export const FIELD_UPDATE = 'FIELD_UPDATE'
export const SHOW_TOOLTIPS = 'SHOW_TOOLTIPS'

// export function updateField(field, value) {
//     return {
//         type: FIELD_UPDATE,
//         field,
//         value
//     }
// }

export const updateField = createAction(FIELD_UPDATE)

export const enableTooltips = createAction(SHOW_TOOLTIPS)

// export function enableTooltips(enableTooltips) {
//     let a = createAction(SHOW_TOOLTIPS);
//     console.log(a);
//     return a();
// }
//     return {
//         type: SHOW_TOOLTIPS,
//         enableTooltips
//     }
// }