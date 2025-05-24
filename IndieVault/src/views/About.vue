<!-- src/views/About.vue -->
<template>
    <div class="about">
        <h2 class="text-center mb-4">About IndieVault</h2>

        <p class="lead text-center">
            This website is designed to be a indie game web store, showcasing the latest indie games and news, as well
            as providing a platform for indie developers to share their work and engage with the community.
        </p>

        <!-- Input Form -->
        <div class="row justify-content-center mt-5">
            <div class="col-md-6">
                <form @submit.prevent>
                    <div class="mb-3">
                        <label for="firstName" class="form-label">First Name:</label>
                        <input id="firstName" v-model="firstName" type="text" class="form-control" />
                    </div>

                    <div class="mb-3">
                        <label for="lastName" class="form-label">Last Name:</label>
                        <input id="lastName" v-model="lastName" type="text" class="form-control" />
                    </div>
                </form>

                <!-- Dynamic welcome message -->
                <div class="alert alert-primary mt-4" v-if="fullName">
                    Welcome, {{ fullName }}!
                </div>

                <!-- Radio selection -->
                <div class="mt-4">
                    <p>Select your favorite indie game:</p>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" id="stardew" value="stardew"
                            v-model="selectedImage" />
                        <label class="form-check-label" for="stardew">Stardew Valley</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" id="wilds" value="wilds" v-model="selectedImage" />
                        <label class="form-check-label" for="wilds">Outer Wilds</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" id="hades" value="hades" v-model="selectedImage" />
                        <label class="form-check-label" for="hades">Hades</label>
                    </div>
                </div>

                <!-- Image based on selection -->
                <div class="mt-4 text-center">
                    <img v-if="selectedImage" :src="imageUrl" :alt="selectedImage" class="img-fluid rounded shadow"
                        style="max-height: 300px;" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import stardewImg from '../assets/stardew.jpg'
import wildsImg from '../assets/wilds.jpg'
import hadesImg from '../assets/hades.jpg'

export default {
    name: 'About',
    data() {
        return {
            firstName: '',
            lastName: '',
            selectedImage: ''
        }
    },
    computed: {
        fullName() {
            if (this.firstName || this.lastName) {
                return `${this.firstName} ${this.lastName}`.trim()
            }
            return ''
        },
        imageUrl() {
            // Use URLs or local paths — adjust if using your own assets
            return this.selectedImage === 'stardew' ? stardewImg
                : this.selectedImage === 'wilds' ? wildsImg
                    : this.selectedImage === 'hades' ? hadesImg : ''
        }
    }
}
</script>

<style scoped>
.about {
    color: #f2f2f2;
    /* Light text for dark background */
    padding-bottom: 4rem;
    /* Add some padding at the bottom */
}

img {
    object-fit: cover;
}

/* Optional: enhance form labels and inputs */
.form-label {
    color: #ddd;
}

.form-check-label {
    color: #ccc;
}
</style>