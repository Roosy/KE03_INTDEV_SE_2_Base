// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("searchInput");

    const filterColumn = document.getElementById("filterColumn");
    const filterValue = document.getElementById("filterValue");

    const filterToggle = document.getElementById("filterToggle");
    const filterPanel = document.getElementById("filterPanel");

    const rows = document.querySelectorAll("#customerTable tbody tr");

    // Exit if we're not on the Customer page
    if (!searchInput ||
        !filterColumn ||
        !filterValue ||
        rows.length === 0)
        return;

    // Toggle filter panel
    filterToggle?.addEventListener("click", () => {
        filterPanel.classList.toggle("show");
    });

    // Close filter panel when clicking outside
    document.addEventListener("click", (e) => {

        if (
            filterPanel &&
            filterToggle &&
            !filterPanel.contains(e.target) &&
            !filterToggle.contains(e.target)
        ) {
            filterPanel.classList.remove("show");
        }
    });

    function populateFilterValues() {

        filterValue.innerHTML =
            '<option value="">All</option>';

        const columnIndex = filterColumn.value;

        if (columnIndex === "")
            return;

        const values = new Set();

        rows.forEach(row => {

            const value =
                row.cells[columnIndex]
                    .innerText
                    .trim();

            if (value)
                values.add(value);
        });

        [...values]
            .sort()
            .forEach(value => {

                const option =
                    document.createElement("option");

                option.value = value;
                option.textContent = value;

                filterValue.appendChild(option);
            });
    }

    function filterTable() {

        const searchText =
            searchInput.value.toLowerCase().trim();

        const selectedColumn =
            filterColumn.value;

        const selectedValue =
            filterValue.value.toLowerCase();

        rows.forEach(row => {

            const rowText =
                row.innerText.toLowerCase();

            const matchesSearch =
                rowText.includes(searchText);

            let matchesFilter = true;

            if (
                selectedColumn !== "" &&
                selectedValue !== ""
            ) {
                matchesFilter =
                    row.cells[selectedColumn]
                        .innerText
                        .toLowerCase()
                        .trim() === selectedValue;
            }

            row.style.display =
                matchesSearch && matchesFilter
                    ? ""
                    : "none";
        });
    }

    filterColumn.addEventListener("change", () => {

        populateFilterValues();
        filterTable();
    });

    filterValue.addEventListener("change", filterTable);

    searchInput.addEventListener("input", filterTable);

    populateFilterValues();


    


});


const clearFilter =
    document.getElementById("clearFilter");

clearFilter?.addEventListener("click", () => {

    filterColumn.value = "";

    filterValue.innerHTML =
        '<option value="">All</option>';

    filterPanel?.classList.remove("show");

    filterTable();
});

function updateClearButton() {

    const hasFilter =
        filterColumn.value !== "" ||
        filterValue.value !== "";

    clearFilter.style.display =
        hasFilter ? "block" : "none";
}


document.querySelectorAll(".customer-row")
    .forEach(row => {

        row.addEventListener("click", () => {

            window.location.href =
                row.dataset.url;
        });

    });

document.querySelectorAll(".edit-btn, .delete-btn")
    .forEach(button => {

        button.addEventListener("click", (e) => {

            e.stopPropagation();
        });

    });

const clearSearch =
    document.getElementById("clearSearch");

searchInput.addEventListener("input", () => {

    clearSearch.style.display =
        searchInput.value.trim()
            ? "block"
            : "none";

    filterTable();
});

clearSearch?.addEventListener("click", () => {

    searchInput.value = "";

    clearSearch.style.display = "none";

    filterTable();

    searchInput.focus();
});