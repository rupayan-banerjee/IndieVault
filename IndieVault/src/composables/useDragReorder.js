// src/composables/useDragReorder.js
import { ref } from 'vue';

/**
 * Composable to support drag-and-drop reordering with vuedraggable.
 * @param {import('vue').Ref<Array>} listRef - Reactive array reference to reorder.
 * @returns {{isDragging: import('vue').Ref<boolean>, onStart: Function, onEnd: Function}}
 */
export function useDragReorder(listRef) {
    const isDragging = ref(false);

    /** Called when drag starts */
    function onStart() {
        isDragging.value = true;
    }

    /** Called when drag ends */
    function onEnd(event) {
        isDragging.value = false;
    }

    return { isDragging, onStart, onEnd };
}