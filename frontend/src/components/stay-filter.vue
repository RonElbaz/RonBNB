<template>
    <!-- <el-button text @click="dialogFormVisible = true">Filter</el-button> -->
    <section class="main-layout filter-container">
        <button class="btn btn-filter" text @click="dialogFormVisible = true">Filters</button>
    </section>
    <el-dialog v-model="dialogFormVisible" title="Filters" center>
        <el-form :model="form" class="filter-form-layout">

            <el-form-item>
                <h1>Price Range<br><span>The average nightly price is</span></h1>
                
                
                <el-slider v-model="form.priceRange" range :max="1500" />
                <div class="filter-input-price flex">
                    <el-input v-model.number="form.priceRange[0]"/>
                    <span>-</span>
                    <el-input v-model.number="form.priceRange[1]"/>
                </div>
            </el-form-item>

            <hr>

            <el-form-item>
                <el-checkbox-group v-model="form.checkList">
                    <el-checkbox v-for="t, idx in placeType" :key="t" :label="t">{{ t }} -
                        <span>{{ placeTypeValues[idx] }}</span> </el-checkbox>
                </el-checkbox-group>
            </el-form-item>

            <el-form-item label="bedrooms">
                <el-checkbox-group @change="sliceBedrooms" v-model="form.bedrooms">
                    <el-checkbox-button v-for="num in 8" :key="num" :label="num" />
                </el-checkbox-group>
            </el-form-item>

            <el-form-item label="beds">
                <el-checkbox-group @change="sliceBeds" v-model="form.beds">
                    <el-checkbox-button v-for="num in 8" :key="num" :label="num" />
                </el-checkbox-group>
            </el-form-item>

            <el-form-item label="bathrooms">
                <el-checkbox-group @change="sliceBathrooms" v-model="form.bathrooms">
                    <el-checkbox-button v-for="num in 8" :key="num" :label="num" />
                </el-checkbox-group>
            </el-form-item>

            <hr>

            <el-form-item label="Property type">
                <el-checkbox-group v-model="form.propertyType">
                    <el-checkbox-button label="House"><img
                            src="https://a0.muscache.com/pictures/4d7580e1-4ab2-4d26-a3d6-97f9555ba8f9.jpg"> House
                    </el-checkbox-button>
                    <el-checkbox-button label="Apartment"><img
                            src="https://a0.muscache.com/pictures/21cfc7c9-5457-494d-9779-7b0c21d81a25.jpg"> Apartment
                    </el-checkbox-button>
                    <el-checkbox-button label="Geusthouse"><img
                            src="https://a0.muscache.com/pictures/6f261426-2e47-4c91-8b1a-7a847da2b21b.jpg"> Geusthouse
                    </el-checkbox-button>
                    <el-checkbox-button label="Hotel"><img
                            src="https://a0.muscache.com/pictures/64b27fed-56a1-4f03-950a-d8da08efb428.jpg"> Hotel
                    </el-checkbox-button>
                </el-checkbox-group>
            </el-form-item>

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
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>


export default {
    name: 'stay-filter',
    data() {
        return {
            dialogFormVisible: false,
            placeTypeValues: ["A place all to yourself", "Your own room in a home or a hotel, plus some shared common spaces", "A sleeping space and common areas that may be shared with others"],
            placeType: [
                "Entire place",
                "Private room",
                "Shared room"
            ],
            amenitiesOpts: ["Wifi", "Washer", "Air conditioning", "Kitchen", "Dryer"],
            form: {
                priceRange: [0, 1500],
                roomType:[],
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
        cleanForm(){
            this.dialogFormVisible=false
            this.form.priceRange = [0,1500]
            this.form.roomType = []
            this.form.bedrooms = []
            this.form.bathrooms = []
            this.form.beds = []
            this.form.propertyType = []
            this.form.amenities = []
            this.form.superHost = false
        },
        onSetFilter(){
           this.dialogFormVisible=false
           var filter= JSON.parse(JSON.stringify(this.form));
           this.$store.dispatch({ type: "setFilter", filterBy: { ...filter} })
        }
    },
}
</script>

<style>
</style>
