<script>
    import { Card, CardHeader, CardBody } from 'sveltestrap';

    import { PercentIcon } from 'svelte-feather-icons';
    
</script>

<Card class="order-summery p-sm-25 p-15 order-summery--width mt-lg-0 mt-20">
    <CardHeader class="border-bottom-0 p-0 pb-25">
        <h5 class="fw-500">Order Summary</h5>
    </CardHeader>
    <CardBody class="px-sm-25 px-20">
        <div class="total">
            <div class="subtotalTotal">Subtotal: <span>$1,690.26</span></div>
            <div class="taxes">discount: <span>-$126.30</span></div>
            <div class="shipping">Shipping charge: <span>$46.30</span></div>
        </div>
        <div class="select-coupon position-relative">
            <span class="percent"><PercentIcon /></span>
            <select name="sell-coupon" id="sell-coupon" class="form-control form-select border-0 px-1">
                <option value="HROJSF">HROJSF</option>
                <option value="RYZZWK">RYZZWK</option>
                <option value="CLMVBG">CLMVBG</option>
                <option value="RQAEAD">RQAEAD</option>
                <option value="DFINSX">DFINSX</option>
            </select>
        </div>
        <div class="promo-code">
            <form action="/">
                <label for="exampleInputEmail1">promo code</label>
                <div class="d-flex align-items-center">
                    <input id="exampleInputEmail1" type="text" class="form-control">
                    <a href="/" class="btn">apply</a>
                </div>
            </form>
        </div>
        <div class="total-money d-flex justify-content-between">
            <h6>Total :</h6>
            <h5>$1738.60</h5>
        </div>
        <a href="/" class="checkout btn-secondary content-center w-100 btn-lg mt-20"> procdces to checkout <i class="las la-arrow-right"></i></a>
    </CardBody>
</Card>