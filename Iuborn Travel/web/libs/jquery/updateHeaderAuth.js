function updateHeaderAuth() {
    const isLoggedIn = localStorage.getItem("loggedIn");
    const username = localStorage.getItem("username");
    const showWelcome = localStorage.getItem("showWelcome");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemCount = cart.length;

    const userGreeting = document.getElementById("userGreeting");
    const usernameDisplay = document.getElementById("usernameDisplay");
    const registerNav = document.getElementById("registerNav");
    const loginCardContainer = document.getElementById("loginCardContainer");
    const introText = document.querySelector(".intro-text");
    const logoutBtn = document.getElementById("logoutBtn");
    const separator = document.getElementById("separator");
    const cartLink = document.getElementById("cartLink");
    const cartItemCountSpan = document.getElementById("cartItemCount");

    if (isLoggedIn === "true" && username) {
        userGreeting?.classList.remove("d-none");
        usernameDisplay.textContent = username;
        registerNav?.classList.add("d-none");
        loginCardContainer?.classList.add("d-none");
        introText?.classList.remove("d-none");
        logoutBtn?.classList.remove("d-none");
        separator?.classList.remove("d-none");
        cartLink?.classList.remove("d-none"); // Hiển thị giỏ hàng khi đăng nhập
        cartItemCountSpan.textContent = cartItemCount; // Cập nhật số lượng giỏ hàng

        if (showWelcome === "true") {
            document.getElementById("modalUsername").textContent = username;
            const welcomeModal = new bootstrap.Modal(document.getElementById("welcomeModal"));
            welcomeModal.show();
            localStorage.removeItem("showWelcome");
        }
    } else {
        userGreeting?.classList.add("d-none");
        registerNav?.classList.remove("d-none");
        logoutBtn?.classList.add("d-none");
        separator?.classList.add("d-none");
        cartLink?.classList.add("d-none"); // Ẩn giỏ hàng khi chưa đăng nhập
        cartItemCountSpan.textContent = 0; // Đảm bảo số lượng là 0 khi chưa đăng nhập
    }
}

function updateCartCountOnHeader() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemCountSpan = document.getElementById("cartItemCount");
    if (cartItemCountSpan) {
        cartItemCountSpan.textContent = cart.length;
    }
}

// Xử lý đăng nhập (giữ nguyên)
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const username = email.split("@")[0];
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("username", username);
    localStorage.setItem("showWelcome", "true");
    updateHeaderAuth();
    location.reload();
});

// Xử lý đăng xuất (giữ nguyên)
document.getElementById("logoutBtn")?.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.clear();
    updateHeaderAuth();
    location.href = "index.html";
});

// Lắng nghe sự kiện DOMContentLoaded
window.addEventListener("DOMContentLoaded", () => {
    updateHeaderAuth();
    updateCartCountOnHeader(); // Cập nhật số lượng giỏ hàng khi trang tải
});

// Lắng nghe sự kiện tùy chỉnh khi giỏ hàng được cập nhật (ví dụ: thêm, xóa sản phẩm)
document.addEventListener('cartUpdated', updateCartCountOnHeader);

// Ví dụ: Kích hoạt sự kiện 'cartUpdated' khi bạn thêm sản phẩm vào giỏ hàng
// function addToCart(item) {
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];
//     cart.push(item);
//     localStorage.setItem("cart", JSON.stringify(cart));
//     document.dispatchEvent(new Event('cartUpdated'));
// }

// Ví dụ: Kích hoạt sự kiện 'cartUpdated' khi bạn xóa sản phẩm khỏi giỏ hàng
// function removeFromCart(itemId) {
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];
//     cart = cart.filter(item => item.id !== itemId);
//     localStorage.setItem("cart", JSON.stringify(cart));
//     document.dispatchEvent(new Event('cartUpdated'));
// }