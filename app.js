// =========================
// FOOD MENU
// =========================

const foods = [
    {
        id: 1,
        name: "ข้าวกะเพราหมูสับ",
        price: 40,
        category: "อาหาร",
        image: "images/ข้าวกะเพราหมูสับ.png"
    },
    {
        id: 2,
        name: "ข้าวกะเพราหมูกรอบ",
        price: 45,
        category: "อาหาร",
        image: "images/ข้าวกะเพราหมูกรอบ.png"
    },
    {
        id: 3,
        name: "ข้าวกะเพราทะเลรวม",
        price: 60,
        category: "อาหาร",
        image: "images/ข้าวกะเพราทะเลรวม.png"
    },
    {
        id: 4,
        name: "ข้าวกะเพรากุ้ง",
        price: 50,
        category: "อาหาร",
        image: "images/ข้าวกะเพรากุ้ง.png"
    },
    {
        id: 5,
        name: "ข้าวกะเพราปลาหมึก",
        price: 50,
        category: "อาหาร",
        image: "images/ข้าวกะเพราปลาหมึก.png"
    },
    {
        id: 6,
        name: "ข้าวกะเพราเนื้อ",
        price: 55,
        category: "อาหาร",
        image: "images/ข้าวกะเพราเนื้อ.png"
    },
    {
        id: 7,
        name: "น้ำเปล่า",
        price: 10,
        category: "เครื่องดื่ม",
        image: "images/น้ำเปล่า.jpg"
    },
    {
        id: 8,
        name: "เป๊ปซี่",
        price: 20,
        category: "เครื่องดื่ม",
        image: "images/เป๊ปซี่.jpg"
    },
    {
        id: 9,
        name: "โค้ก",
        price: 20,
        category: "เครื่องดื่ม",
        image: "images/โค้ก.jpg"
    },
    {
        id: 10,
        name: "เก๊กฮวย",
        price: 15,
        category: "เครื่องดื่ม",
        image: "images/เก๊กฮวย.jpg"
    }
];


// =========================
// CART
// =========================

let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];

let currentCategory = "ทั้งหมด";


// =========================
// SHOW FOOD
// =========================

function displayFoods(list = null) {

    const container =
        document.getElementById("foodContainer");

    if (!container) return;

    let foodsToShow;

    // ถ้ามีรายการจากการค้นหา
    if (list !== null) {

        foodsToShow = list;

    }

    // ถ้าไม่ได้ค้นหา ให้กรองตามหมวด
    else {

        if (currentCategory === "ทั้งหมด") {

            foodsToShow = foods;

        } else {

            foodsToShow =
                foods.filter(
                    food =>
                        food.category === currentCategory
                );

        }

    }


    container.innerHTML = "";


    // ถ้าไม่พบสินค้า

    if (foodsToShow.length === 0) {

        container.innerHTML = `

            <div style="
                grid-column: 1 / -1;
                text-align: center;
                padding: 40px 20px;
                color: #888;
            ">

                <div style="
                    font-size: 45px;
                    margin-bottom: 10px;
                ">
                    🔍
                </div>

                <p>
                    ไม่พบเมนูที่ค้นหา
                </p>

            </div>

        `;

        return;
    }


    // แสดงอาหาร

    foodsToShow.forEach(food => {

        container.innerHTML += `

            <div class="food-card">

                <img
                    src="${food.image}"
                    alt="${food.name}"
                    class="food-image"
                >

                <div class="food-info">

                    <div class="food-name">
                        ${food.name}
                    </div>

                    <div class="food-price">
                        ฿${food.price}
                    </div>

                    <button
                        class="add-button"
                        onclick="addToCart(${food.id})">

                        + เพิ่มลงตะกร้า

                    </button>

                </div>

            </div>

        `;

    });

}


// =========================
// ADD TO CART
// =========================

function addToCart(id) {

    const food =
        foods.find(
            item => item.id === id
        );

    if (!food) return;


    const existing =
        cart.find(
            item => item.id === id
        );


    if (existing) {

        existing.quantity++;

    }

    else {

        cart.push({
            ...food,
            quantity: 1
        });

    }


    saveCart();

    updateCartCount();

}


// =========================
// SAVE CART
// =========================

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


// =========================
// CART COUNT
// =========================

function updateCartCount() {

    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    const cartCount =
        document.getElementById(
            "cartCount"
        );


    if (cartCount) {

        cartCount.textContent =
            count;

    }

}


// =========================
// OPEN CART
// =========================

function openCart() {

    renderCart();


    const modal =
        document.getElementById(
            "cartModal"
        );


    if (modal) {

        modal.style.display =
            "block";

    }

}


// =========================
// CLOSE CART
// =========================

function closeCart() {

    const modal =
        document.getElementById(
            "cartModal"
        );


    if (modal) {

        modal.style.display =
            "none";

    }

}


// =========================
// RENDER CART
// =========================

function renderCart() {

    const container =
        document.getElementById(
            "cartItems"
        );


    if (!container) return;


    container.innerHTML = "";


    if (cart.length === 0) {

        container.innerHTML = `

            <p style="
                text-align:center;
                padding:30px;
                color:#777;
            ">

                🛒 ยังไม่มีสินค้าในตะกร้า

            </p>

        `;


        const totalElement =
            document.getElementById(
                "cartTotal"
            );


        if (totalElement) {

            totalElement.textContent =
                "0";

        }


        return;
    }


    let total = 0;


    cart.forEach(item => {

        const itemTotal =
            item.price *
            item.quantity;


        total += itemTotal;


        container.innerHTML += `

            <div class="cart-item">

                <div style="
                    display:flex;
                    align-items:center;
                    gap:10px;
                    min-width:0;
                ">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                        style="
                            width:55px;
                            height:55px;
                            object-fit:cover;
                            border-radius:10px;
                            flex-shrink:0;
                        "
                    >

                    <div>

                        <strong>
                            ${item.name}
                        </strong>

                        <div style="
                            margin-top:4px;
                            color:#6858dc;
                            font-size:14px;
                        ">

                            ฿${item.price}

                        </div>

                    </div>

                </div>


                <div class="quantity">

                    <button
                        onclick="changeQuantity(
                            ${item.id},
                            -1
                        )">

                        −

                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        onclick="changeQuantity(
                            ${item.id},
                            1
                        )">

                        +

                    </button>

                </div>

            </div>

        `;

    });


    const totalElement =
        document.getElementById(
            "cartTotal"
        );


    if (totalElement) {

        totalElement.textContent =
            total.toLocaleString();

    }

}


// =========================
// CHANGE QUANTITY
// =========================

function changeQuantity(id, change) {

    const item =
        cart.find(
            item => item.id === id
        );


    if (!item) return;


    item.quantity += change;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                item => item.id !== id
            );

    }


    saveCart();

    updateCartCount();

    renderCart();

}


// =========================
// CHECKOUT
// =========================

function openCheckout() {

    if (cart.length === 0) {

        alert(
            "กรุณาเพิ่มสินค้าในตะกร้าก่อน"
        );

        return;
    }


    closeCart();


    const modal =
        document.getElementById(
            "checkoutModal"
        );


    if (modal) {

        modal.style.display =
            "block";

    }

}


// =========================
// CLOSE CHECKOUT
// =========================

function closeCheckout() {

    const modal =
        document.getElementById(
            "checkoutModal"
        );


    if (modal) {

        modal.style.display =
            "none";

    }

}


// =========================
// PAYMENT
// =========================

function showPayment(type) {

    const transferBox =
        document.getElementById(
            "transferBox"
        );


    const codBox =
        document.getElementById(
            "codBox"
        );


    if (transferBox) {

        transferBox.style.display =
            "none";

    }


    if (codBox) {

        codBox.style.display =
            "none";

    }


    if (type === "transfer") {

        if (transferBox) {

            transferBox.style.display =
                "block";

        }

    }


    if (type === "cod") {

        if (codBox) {

            codBox.style.display =
                "block";

        }

    }

}


// =========================
// CONFIRM ORDER
// =========================

function confirmOrder() {

    const name =
        document.getElementById(
            "customerName"
        ).value.trim();


    const phone =
        document.getElementById(
            "customerPhone"
        ).value.trim();


    const address =
        document.getElementById(
            "customerAddress"
        ).value.trim();


    const payment =
        document.querySelector(
            'input[name="payment"]:checked'
        );


    // ตรวจชื่อ

    if (!name) {

        alert(
            "กรุณากรอกชื่อ"
        );

        return;
    }


    // ตรวจเบอร์

    if (!phone) {

        alert(
            "กรุณากรอกเบอร์โทร"
        );

        return;
    }


    // ตรวจที่อยู่

    if (!address) {

        alert(
            "กรุณากรอกที่อยู่"
        );

        return;
    }


    // ตรวจการชำระเงิน

    if (!payment) {

        alert(
            "กรุณาเลือกวิธีชำระเงิน"
        );

        return;
    }


    // ตรวจสลิป

    if (
        payment.value ===
        "transfer"
    ) {

        const slip =
            document.getElementById(
                "slipUpload"
            );


        if (
            !slip ||
            slip.files.length === 0
        ) {

            alert(
                "กรุณาแนบสลิปการโอนเงินก่อนสั่งซื้อ"
            );

            return;
        }

    }


    // =========================
    // ORDER NUMBER
    // =========================

    const orderNumber =
        "NF" +
        Date.now()
            .toString()
            .slice(-6);


    const orderNumberElement =
        document.getElementById(
            "orderNumber"
        );


    if (orderNumberElement) {

        orderNumberElement.textContent =
            orderNumber;

    }


    // =========================
    // CALCULATE TOTAL
    // =========================

    let orderItems = "";

    let total = 0;


    cart.forEach(item => {

        const itemTotal =
            item.price *
            item.quantity;


        total += itemTotal;


        orderItems += `

            <div class="order-summary-item">

                <span>

                    ${item.name}
                    × ${item.quantity}

                </span>


                <strong>

                    ฿${itemTotal}

                </strong>

            </div>

        `;

    });


    // =========================
    // HISTORY
    // =========================

    const history =
        JSON.parse(
            localStorage.getItem(
                "orderHistory"
            )
        ) || [];


    const historyItems =
        cart.map(item => ({

            name:
                item.name,

            quantity:
                item.quantity,

            total:
                item.price *
                item.quantity

        }));


    const orderData = {

        orderNumber:
            orderNumber,

        date:
            new Date()
                .toLocaleString(
                    "th-TH"
                ),

        name:
            name,

        phone:
            phone,

        address:
            address,

        payment:
            payment.value ===
                "transfer"
                ? "🏦 โอนเงิน"
                : "💵 เก็บเงินปลายทาง",

        items:
            historyItems,

        total:
            total

    };


    history.unshift(
        orderData
    );


    localStorage.setItem(
        "orderHistory",
        JSON.stringify(history)
    );


    // =========================
    // ORDER SUMMARY
    // =========================

    const orderSummary =
        document.getElementById(
            "orderSummary"
        );


    if (orderSummary) {

        orderSummary.innerHTML = `

            <div class="order-info">

                <h3>
                    🧾 รายการอาหาร
                </h3>

                ${orderItems}

                <div
                    class="order-summary-total">

                    <span>
                        รวมทั้งหมด
                    </span>

                    <strong>
                        ฿${total.toLocaleString()}
                    </strong>

                </div>

            </div>


            <div class="order-info">

                <h3>
                    👤 ข้อมูลลูกค้า
                </h3>

                <p>
                    <strong>
                        ชื่อ:
                    </strong>

                    ${name}

                </p>


                <p>
                    <strong>
                        เบอร์:
                    </strong>

                    ${phone}

                </p>


                <p>
                    <strong>
                        ที่อยู่:
                    </strong>

                    ${address}

                </p>


                <p>
                    <strong>
                        ชำระเงิน:
                    </strong>

                    ${
                        payment.value ===
                        "transfer"
                            ? "🏦 โอนเงิน"
                            : "💵 เก็บเงินปลายทาง"
                    }

                </p>

            </div>

        `;

    }


    // =========================
    // SHOW SUCCESS
    // =========================

    closeCheckout();


    const successModal =
        document.getElementById(
            "successModal"
        );


    if (successModal) {

        successModal.style.display =
            "block";

    }


    // =========================
    // CLEAR CART
    // =========================

    cart = [];


    saveCart();

    updateCartCount();

}


// =========================
// CLOSE SUCCESS
// =========================

function closeSuccess() {

    const modal =
        document.getElementById(
            "successModal"
        );


    if (modal) {

        modal.style.display =
            "none";

    }

}


// =========================
// SEARCH
// =========================

function searchFood() {
    function clearSearch() {

    const searchInput =
        document.getElementById("searchInput");

    if (!searchInput) return;

    searchInput.value = "";

    searchFood();

    searchInput.focus();

}

    const searchInput =
        document.getElementById(
            "searchInput"
        );


    if (!searchInput) {

        displayFoods();

        return;
    }


    const keyword =
        searchInput.value
            .trim()
            .toLowerCase();


    const result =
        foods.filter(food => {

            const matchName =
                food.name
                    .toLowerCase()
                    .includes(keyword);


            const matchCategory =
                currentCategory ===
                    "ทั้งหมด" ||
                food.category ===
                    currentCategory;


            return (
                matchName &&
                matchCategory
            );

        });


    displayFoods(result);

}


// =========================
// CATEGORY
// =========================

function filterCategory(category) {

    currentCategory =
        category;


    // เปลี่ยนปุ่ม active

    document
        .querySelectorAll(".category")
        .forEach(button => {

            button.classList.remove(
                "active"
            );

        });


    // หาปุ่มที่ตรงกับหมวด

    document
        .querySelectorAll(".category")
        .forEach(button => {

            const text =
                button.textContent
                    .trim();


            if (
                category === "ทั้งหมด" &&
                text.includes("ทั้งหมด")
            ) {

                button.classList.add(
                    "active"
                );

            }


            else if (
                category === "อาหาร" &&
                text.includes("อาหาร")
            ) {

                button.classList.add(
                    "active"
                );

            }


            else if (
                category === "เครื่องดื่ม" &&
                text.includes("เครื่องดื่ม")
            ) {

                button.classList.add(
                    "active"
                );

            }

        });


    // สำคัญ:
    // ส่ง null เพื่อให้ displayFoods
    // กรองตาม currentCategory

    displayFoods();

}


// =========================
// ORDER HISTORY
// =========================

function openHistory() {

    const historyModal =
        document.getElementById(
            "historyModal"
        );


    if (!historyModal) return;


    historyModal.style.display =
        "block";


    renderHistory();

}


function closeHistory() {

    const historyModal =
        document.getElementById(
            "historyModal"
        );


    if (!historyModal) return;


    historyModal.style.display =
        "none";

}


function renderHistory() {

    const historyList =
        document.getElementById(
            "historyList"
        );


    if (!historyList) return;


    const history =
        JSON.parse(
            localStorage.getItem(
                "orderHistory"
            )
        ) || [];


    if (history.length === 0) {

        historyList.innerHTML = `

            <div class="history-empty">

                <div class="history-empty-icon">
                    📭
                </div>

                <p>
                    ยังไม่มีประวัติการสั่งซื้อ
                </p>

            </div>

        `;

        return;
    }


    historyList.innerHTML =
        history.map(
            order => `

            <div class="history-card">

                <div class="history-header">

                    <div>

                        <div class="history-order-number">

                            🧾 ${order.orderNumber}

                        </div>

                        <div class="history-date">

                            📅 ${order.date}

                        </div>

                    </div>


                    <div class="history-status">

                        ✓ สั่งซื้อสำเร็จ

                    </div>

                </div>


                <div class="history-info">

                    <p>
                        👤
                        <strong>
                            ${order.name}
                        </strong>
                    </p>

                    <p>
                        📞 ${order.phone}
                    </p>

                    <p>
                        💳 ${order.payment}
                    </p>

                    <p>
                        📍 ${order.address}
                    </p>

                </div>


                <div class="history-items">

                    ${order.items.map(
                        item => `

                        <div class="history-item">

                            <span>

                                ${item.name}
                                × ${item.quantity}

                            </span>

                            <strong>

                                ฿${item.total}

                            </strong>

                        </div>

                    `
                    ).join("")}

                </div>


                <div class="history-total">

                    <span>
                        รวมทั้งหมด
                    </span>

                    <strong>
                        ฿${order.total.toLocaleString()}
                    </strong>

                </div>

            </div>

        `
        ).join("");

}


// =========================
// START APP
// =========================

displayFoods();

updateCartCount();
// =========================
// FOOD DETAIL
// =========================

let selectedFood = null;
let detailQuantity = 1;


function openFoodDetail(foodId) {

    selectedFood =
        foods.find(food => food.id === foodId);

    if (!selectedFood) return;

    detailQuantity = 1;

    document.getElementById("detailImage").src =
        selectedFood.image;

    document.getElementById("detailImage").alt =
        selectedFood.name;

    document.getElementById("detailName").textContent =
        selectedFood.name;

    document.getElementById("detailPrice").textContent =
        "฿" + selectedFood.price;

    document.getElementById("detailDescription").textContent =
        "อาหารอร่อย สดใหม่ พร้อมเสิร์ฟจาก Nene Food";

    document.getElementById("detailQuantity").textContent =
        detailQuantity;

    document.getElementById("foodDetailModal").style.display =
        "block";
}


function closeFoodDetail() {

    document.getElementById("foodDetailModal").style.display =
        "none";

    selectedFood = null;

}


function changeDetailQuantity(amount) {

    detailQuantity += amount;

    if (detailQuantity < 1) {
        detailQuantity = 1;
    }

    document.getElementById("detailQuantity").textContent =
        detailQuantity;
}


function addDetailToCart() {

    if (!selectedFood) return;

    for (let i = 0; i < detailQuantity; i++) {
        addToCart(selectedFood.id);
    }

    closeFoodDetail();

    openCart();

}