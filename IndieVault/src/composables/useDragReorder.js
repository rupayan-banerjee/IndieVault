import { ref } from 'vue';

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