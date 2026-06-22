let searchData = [];

fetch("data/search.json")
.then(r => r.json())
.then(data => {
    searchData = data;
});

const searchBox =
    document.getElementById("global-search");

const resultsDiv =
    document.getElementById("search-results");

searchBox.addEventListener("input", () => {

    const term =
        searchBox.value.trim().toLowerCase();

    resultsDiv.innerHTML = "";

    if (term.length < 2)
        return;

    const results = searchData
        .filter(game =>
            game.title.toLowerCase().includes(term)
        )
        .slice(0, 25);

    results.forEach(game => {

        const link =
            document.createElement("a");

        link.className = "search-result";

        link.href =
            `platforms/${game.platform_slug}.html#${game.game_anchor}`;

        link.innerHTML = `
            <strong>${game.title}</strong>
            <div class="search-platform">
                ${game.platform}
                • ${game.year || "Unknown"}
                • ${game.publisher || "-"}
            </div>
        `;

        resultsDiv.appendChild(link);

    });

});