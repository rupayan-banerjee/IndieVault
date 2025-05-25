<template>
    <div class="news">
        <!-- Page heading -->
        <h2 class="text-center mb-4">Latest News</h2>

        <!-- Search box to filter news by keyword -->
        <input v-model="searchQuery" type="text" class="form-control mb-4"
            placeholder="Search news by title, content, date, or category" aria-label="Search news" />

        <!-- News cards list -->
        <div class="row">
            <!-- Each card represents a news item -->
            <div class="col-md-6 mb-4" v-for="item in paginatedNews" :key="item.title">
                <article class="card shadow-sm h-100"
                    :aria-labelledby="'news-title-' + item.title.replace(/\s+/g, '-')">
                    <div class="card-body">
                        <h5 class="card-title" :id="'news-title-' + item.title.replace(/\s+/g, '-')">
                            {{ item.title }}
                        </h5>
                        <h6 class="card-subtitle mb-2 text-muted">{{ item.date }} | {{ item.category }}</h6>
                        <p class="card-text">{{ item.content }}</p>
                    </div>
                </article>
            </div>
        </div>

        <!-- Pagination buttons -->
        <div class="d-flex justify-content-center mt-4">
            <!-- Go to previous page if not on first -->
            <button class="btn btn-outline-primary me-2" :disabled="currentPage === 1" @click="currentPage--"
                aria-label="Go to previous page">
                Previous
            </button>

            <!-- Go to next page if not on last -->
            <button class="btn btn-outline-primary" :disabled="currentPage === totalPages" @click="currentPage++"
                aria-label="Go to next page">
                Next
            </button>
        </div>
    </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import newsData from '../assets/news.json'
import { useDebounce } from '../composables/useDebounce'

export default {
    name: 'News',
    setup() {
        // Raw data & state
        const newsList = ref(newsData)
        const searchQuery = ref('')
        const debouncedSearch = useDebounce(searchQuery, 500)
        const currentPage = ref(1)
        const itemsPerPage = ref(4)

        // Filtered by debounced search term
        const filteredNews = computed(() => {
            const q = debouncedSearch.value.toLowerCase()
            return newsList.value.filter(item =>
                item.title.toLowerCase().includes(q) ||
                item.content.toLowerCase().includes(q) ||
                item.category.toLowerCase().includes(q) ||
                item.date.toLowerCase().includes(q)
            )
        })

        // Total pages
        const totalPages = computed(() =>
            Math.ceil(filteredNews.value.length / itemsPerPage.value)
        )

        // Paginate
        const paginatedNews = computed(() => {
            const start = (currentPage.value - 1) * itemsPerPage.value
            return filteredNews.value.slice(start, start + itemsPerPage.value)
        })

        // Reset page if out of range after filtering
        watch(filteredNews, () => {
            if (currentPage.value > totalPages.value) {
                currentPage.value = 1
            }
        })

        return {
            searchQuery,
            currentPage,
            filteredNews,
            paginatedNews,
            totalPages
        }
    }
}
</script>

<style scoped>
.news {
    color: #f2f2f2;
}

/* News card with glassy styling */
.card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    color: #e0e0e0;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border-radius: 12px;
}

.card:hover {
    transform: scale(1.02);
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
}

/* Title styling */
.card-title {
    color: #ffffff;
}

/* Subtitle styling */
.card-subtitle {
    color: #e2dd35 !important;
}

/* Glassy buttons used in pagination */
button.btn {
    color: #f0f0f0;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background-color: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 8px;
    padding: 0.5rem 1.25rem;
    transition: all 0.3s ease;
}

/* Hover effect for pagination buttons */
button.btn:hover:not(:disabled) {
    background-color: rgba(255, 255, 255, 0.12);
    color: white;
}

/* Disabled state */
button.btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Custom styling for search bar */
input.form-control {
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #f2f2f2;
}

input.form-control::placeholder {
    color: #bbb;
}
</style>