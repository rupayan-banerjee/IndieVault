<template>
    <div class="profile container py-4">
        <!-- User greeting -->
        <h2 class="mb-3">Welcome, {{ user.name }}!</h2>
        <p class="text-muted">Role: {{ user.role }}</p>

        <!-- Wishlist section -->
        <h3 class="mt-4" aria-label="User's Wishlist Section">Your Wishlist</h3>
        <div v-if="wishlistGames.length" class="row" role="region" aria-label="Wishlist Game Cards">
            <div class="col-md-4 mb-4" v-for="game in wishlistGames" :key="game.id">
                <article class="card h-100 glass-card" :aria-labelledby="`wishlist-title-${game.id}`">
                    <img :src="getCover(game.cover)" :alt="`Cover image for ${game.title}`" class="card-img-top rounded"
                        role="img" />
                    <div class="card-body">
                        <h5 class="card-title" :id="`wishlist-title-${game.id}`">{{ game.title }}</h5>
                    </div>
                </article>
            </div>
        </div>
        <div v-else role="alert" aria-live="polite">
            You have no games in your wishlist.
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue'
import auth from '../store/auth'
import fallbackGames from '../assets/games.json'

export default {
    name: 'Profile',
    setup() {
        // Current user
        const user = computed(() => auth.state.currentUser)

        // Load full game list (from localStorage or fallback JSON)
        const storageKey = 'gameList'
        const saved = JSON.parse(localStorage.getItem(storageKey)) || fallbackGames
        const gamesList = ref(saved)

        // Reactive list of wishlist IDs for the *current* user
        const wishlistIds = computed(() => {
            const key = `wishlistGames_${user.value.name}`
            try {
                const raw = localStorage.getItem(key)
                return raw ? JSON.parse(raw) : []
            } catch {
                return []
            }
        })

        // Compute the actual games in the wishlist by ID
        const wishlistGames = computed(() =>
            gamesList.value.filter(g => wishlistIds.value.includes(g.id))
        )

        // Helper to resolve cover image (static asset path)
        const getCover = filename => {
            try {
                return new URL(`../assets/${filename}`, import.meta.url).href
            } catch {
                return ''
            }
        }

        return {
            user,
            wishlistGames,
            getCover,
        }
    }
}
</script>

<style scoped>
.profile {
    color: #f2f2f2;
}

.profile h2 {
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
}

/* Glass-card style */
.glass-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(6px);
    border-radius: 12px;
}

.card-img-top {
    max-height: 150px;
    object-fit: cover;
}

/* Make card titles/text readable */
.profile .card-title {
    color: #f2f2f2;
}

.profile .card-body {
    color: #e0e0e0;
}
</style>