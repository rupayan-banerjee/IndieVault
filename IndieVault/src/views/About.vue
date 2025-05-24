<!-- src/views/About.vue -->
<template>
    <div class="about">
        <h2 class="text-center mb-4">About This Web Application</h2>

        <p class="lead text-center">
            This demo app is designed to showcase Vue.js 3, Bootstrap, and responsive UI principles. It includes
            interactive components, routing, and dynamic content.
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
                    👋 Welcome, {{ fullName }}!
                </div>

                <!-- Radio selection -->
                <div class="mt-4">
                    <p>Select your favorite scenery:</p>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" id="mountain" value="mountain"
                            v-model="selectedImage" />
                        <label class="form-check-label" for="mountain">Mountain</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" id="ocean" value="ocean" v-model="selectedImage" />
                        <label class="form-check-label" for="ocean">Ocean</label>
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
import mountainImg from '../assets/mountain.jpg'
import oceanImg from '../assets/ocean.jpg'

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
            return this.selectedImage === 'mountain' ? mountainImg : oceanImg
        }
    }
}
</script>

<style scoped>
.about {
    color: #f2f2f2;
    /* Light text for dark background */
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