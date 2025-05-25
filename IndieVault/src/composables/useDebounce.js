import { ref, watch } from 'vue';

/**
 * Returns a debounced ref that updates only after the source ref stops changing for the given delay.
 * @param {import('vue').Ref<T>} source - The source ref to debounce.
 * @param {number} delay - Debounce delay in milliseconds.
 * @returns {import('vue').Ref<T>} A ref that updates debounced.
 * @template T
 */
export function useDebounce(source, delay = 300) {
    const debounced = ref(source.value);
    let timeout;

    watch(
        source,
        (newVal) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                debounced.value = newVal;
            }, delay);
        },
        { immediate: true }
    );

    return debounced;
}
