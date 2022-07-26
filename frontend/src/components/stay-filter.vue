<template>
    <!-- <el-button text @click="dialogFormVisible = true">Filter</el-button> -->
    <section class="filter-container">
        <div v-if="showList" class="labels flex ">
            <button @click="onSetFilter(opt.label)" class="clean-button" v-for="opt in filterOpts">
                <div :class="{ 'clicked-btn': type === opt.label }" @click="changedType(opt.label)"
                    class="image-and-txt flex column btn-label">
                    <img class="label-image" :src="imgUrl(opt.src)" alt="">
                    <p class="label-txt circular">{{ opt.label }}</p>
                    <div></div>
                </div>
            </button>
        </div>
        <div v-else class="stays-amount">
            {{ stayLength }} stays
        </div>
        <button :class="{ 'btn-filter-top': !showList }" class="btn btn-filter" text @click="dialogFormVisible = true">
            <img class="filter-img" src="../images/filtetr-image/filter-icon.png"> <span
                class="btn-filter-txt">Filters</span>
        </button>
    </section>
    <el-dialog v-model="dialogFormVisible" title="Filters" center>
        <el-form :model="form" class="filter-form-layout">

            <div class="price-range">
                <el-form-item>
                    <h1>Price Range<br><span>The average nightly price is</span></h1>
                    <el-slider v-model="form.priceRange" range :max="1500" />
                    <div class="filter-input-price flex">
                        <div>
                            <p>min price</p>
                        <el-input   v-model.number="form.priceRange[0]" />
                        </div>
                        <span>-</span>
                        <el-input v-model.number="form.priceRange[1]" />
                    </div>
                </el-form-item>
            </div>
            <hr>

            <el-form-item>
                <h1>Type of place</h1>
                <div class="filter-type-place flex column">
                    <el-checkbox-group v-model="form.roomType">
                        <div class="type-place">
                            <el-checkbox v-for="t, idx in placeType" :key="t" :label="t">{{ t }}
                                <br>
                                <span>{{ placeTypeValues[idx] }}</span>
                            </el-checkbox>
                        </div>
                    </el-checkbox-group>

                </div>
            </el-form-item>
            <hr>
            <h1>Rooms and beds</h1>
            <el-form-item label="Bedrooms">
                <el-checkbox-group @change="sliceBedrooms" v-model="form.bedrooms">
                    <div class="beds-type">
                        <el-checkbox-button v-for="num in 8" :key="num" :label="num" />
                    </div>
                </el-checkbox-group>
            </el-form-item>


            <el-form-item label="Beds">
                <el-checkbox-group @change="sliceBeds" v-model="form.beds">
                    <div class="beds-type">
                        <el-checkbox-button v-for="num in 8" :key="num" :label="num" />
                    </div>
                </el-checkbox-group>
            </el-form-item>

            <el-form-item label="Bathrooms">
                <el-checkbox-group @change="sliceBathrooms" v-model="form.bathrooms">
                    <div class="beds-type">
                        <el-checkbox-button v-for="num in 8" :key="num" :label="num" />
                    </div>
                </el-checkbox-group>
            </el-form-item>

            <hr>
            <div class="house-type-container">
            <el-form-item label="Property type">
                <el-checkbox-group v-model="form.propertyType">
                        <el-checkbox-button label="House"><img
                                src="https://a0.muscache.com/pictures/4d7580e1-4ab2-4d26-a3d6-97f9555ba8f9.jpg"><span class="txt">House</span> 
                        </el-checkbox-button>
                  
                    <el-checkbox-button label="Apartment"><img
                            src="https://a0.muscache.com/pictures/21cfc7c9-5457-494d-9779-7b0c21d81a25.jpg"><span class="txt">Apartment</span> 
                    </el-checkbox-button>
                  
                    <el-checkbox-button label="Geusthouse"><img
                            src="https://a0.muscache.com/pictures/6f261426-2e47-4c91-8b1a-7a847da2b21b.jpg"><span class="txt">Geusthouse</span> 
                    </el-checkbox-button>
                  
                    <el-checkbox-button label="Hotel"><img
                            src="https://a0.muscache.com/pictures/64b27fed-56a1-4f03-950a-d8da08efb428.jpg"><span class="txt">Hotel</span> 
                    </el-checkbox-button>
                  
                </el-checkbox-group>
            </el-form-item>
            </div>

            <hr>

            <el-form-item label="Amenities">
                <el-checkbox-group v-model="form.amenities">
                    <el-checkbox v-for="amn in amenitiesOpts" :key="amn" :label="amn" />
                </el-checkbox-group>
            </el-form-item>

            <hr>

            <el-form-item>
                <pre>
                    superhost
                    Stay with recognized Hosts
                </pre>
                <el-switch v-model="form.superHost" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer flex space-between">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="onSetFilter">Show Stays</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script>
import { requiredNumber } from 'element-plus/es/components/table-v2/src/common'




export default {
    name: 'stay-filter',
    props: {
        showList: {
            type: Boolean,
            required: true,
        },
        stayLength: {
            type: Number
        }
    },
    data() {
        return {
            filterOpts: [
                {
                    label: "All",
                    src: "../images/label-images/global.jpg",
                },
                {
                    label: "Island",
                    src: "../images/label-images/islands.jpg",
                },
                {
                    label: "Beach",
                    src: "../images/label-images/beach.jpg",
                },
                {
                    label: "Pool",
                    src: "../images/label-images/pool.jpg",
                },
                {
                    label: "OMG!",
                    src: "../images/label-images/omg.jpg",
                },
                {
                    label: "Camping",
                    src: "../images/label-images/camping.jpg",
                },
                {
                    label: "Desert",
                    src: "../images/label-images/desert.jpg",
                },
                {
                    label: "Article",
                    src: "../images/label-images/artcit.jpg",
                }],
            type: 'All',
            dialogFormVisible: false,
            placeTypeValues: ["A place all to yourself", "Your own room in a home or a hotel , plus some shared common spaces", "A sleeping space and common areas that may be shared with others"],
            placeType: [
                "Entire home",
                "Private room",
                "Shared room"
            ],
            amenitiesOpts: ["Wifi", "Washer", "Air conditioning", "Kitchen", "Dryer"],
            form: {
                priceRange: [0, 1500],
                roomType: [],
                bedrooms: [],
                beds: [],
                bathrooms: [],
                propertyType: [],
                amenities: [],
                superHost: false,
            }
        }
    },
    components: {
    },
    computed: {
    },
    methods: {
        print() {
            console.log(this.form)
        },
        sliceBedrooms() {
            this.form.bedrooms = this.form.bedrooms.slice(-1)
        },
        sliceBeds() {
            this.form.beds = this.form.beds.slice(-1)
        },
        sliceBathrooms() {
            this.form.bathrooms = this.form.bathrooms.slice(-1)
        },
        cleanForm() {
            this.dialogFormVisible = false
            this.form.priceRange = [0, 1500]
            this.form.roomType = []
            this.form.bedrooms = []
            this.form.bathrooms = []
            this.form.beds = []
            this.form.propertyType = []
            this.form.amenities = []
            this.form.superHost = false
        },
        onSetFilter(category = null) {
            var filter;

            if (typeof (category) === 'string') {
                filter = { category }

            } else {
                this.dialogFormVisible = false
                filter = JSON.parse(JSON.stringify(this.form));
            }
            console.log(filter)
            this.$store.dispatch({ type: "setFilter", filterBy: { ...filter } })
        },
        imgUrl(image) {
            return new URL(image, import.meta.url).href
        },
        changedType(type) {
            this.type = type
        }

    },
}
</script>

<style>
</style>
