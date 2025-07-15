function openSidebar() {
    const overlay = document.getElementById("sidebar-overlay");
    sidebar?.classList.remove("translate-x-full");
    overlay?.classList.remove("opacity-0", "invisible");
    overlay?.classList.add("opacity-50", "visible");
    document.body.style.overflow = "hidden";
}

function closeSidebar() {
    const overlay = document.getElementById("sidebar-overlay");
    sidebar?.classList.add("translate-x-full");
    overlay?.classList.remove("opacity-100", "visible");
    overlay?.classList.add("opacity-0", "invisible");
    document.body.style.overflow = "";
}

function initSidebars() {
    const sidebar = document.getElementById("sidebar");

    if (sidebar && sidebar.classList.contains("sidebar-initialized")) {
        return;         
    }

    const overlay = document.getElementById("sidebar-overlay");
    const closeSidebarBtn = document.getElementById("close-sidebar");
    const openSidebarBtn = document.getElementById('open-sidebar');

    openSidebarBtn?.addEventListener('click', openSidebar);
    closeSidebarBtn?.addEventListener("click", closeSidebar);    

    overlay?.addEventListener("click", closeSidebar);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeSidebar();
        }
    });

    sidebar.classList.add("sidebar-initialized")
}

document.addEventListener("astro:after-swap", () => {
    initSidebars();
})

initSidebars()