import { ref, watch } from 'vue';

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
