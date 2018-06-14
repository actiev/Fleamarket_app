<template>
    <div class="contact_form_box">
        <div class="row">
            <div class="col1">
                <img v-if="product.image" :src="this.uploads+product.image"/>
            </div>
            <div class="col2">
                <div class="description">
                    <h2 class="title">{{ product.title }}</h2>
                    <span class="price">Price: {{product.price}} $</span>
                    <p>{{product.description}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import getProduct from './mixins/getProduct'
export default {
  name: 'ProductPreview',
  mixins: [getProduct]
}
</script>
