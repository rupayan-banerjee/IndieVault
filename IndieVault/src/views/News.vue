<!-- src/views/News.vue -->
<template>
    <div class="news">
        <h2 class="text-center mb-4">Latest News</h2>

        <!-- Search input -->
        <input v-model="searchQuery" type="text" class="form-control mb-4"
            placeholder="Search news by title, content, date, or category" />

        <!-- News list -->
        <div class="row">
            <div class="col-md-6 mb-4" v-for="item in paginatedNews" :key="item.title">
                <div class="card shadow-sm h-100">
                    <div class="card-body">
                        <h5 class="card-title">{{ item.title }}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{{ item.date }} | {{ item.category }}</h6>
                        <p class="card-text">{{ item.content }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Pagination controls -->
        <div class="d-flex justify-content-center mt-4">
            <button class="btn btn-outline-primary me-2" :disabled="currentPage === 1"
                @click="currentPage--">Previous</button>
            <button class="btn btn-outline-primary" :disabled="currentPage === totalPages"
                @click="currentPage++">Next</button>
        </div>
    </div>
</template>

<script>
import newsData from '../assets/news.json'

export default {
    name: 'News',
    data() {
        return {
            newsList: newsData,
            searchQuery: '',
            currentPage: 1,
            itemsPerPage: 4
        }
    },
    computed: {
        filteredNews() {
            const query = this.searchQuery.toLowerCase()
            return this.newsList.filter(item =>
                item.title.toLowerCase().includes(query) ||
                item.content.toLowerCase().includes(query) ||
                item.category.toLowerCase().includes(query) ||
                item.date.toLowerCase().includes(query)
            )
        },
        paginatedNews() {
            const start = (this.currentPage - 1) * this.itemsPerPage
            return this.filteredNews.slice(start, start + this.itemsPerPage)
        },
        totalPages() {
            return Math.ceil(this.filteredNews.length / this.itemsPerPage)
        }
    }
}
</script>

<style scoped>
.card {
    transition: transform 0.2s ease;
}

.card:hover {
    transform: scale(1.02);
}
</style>