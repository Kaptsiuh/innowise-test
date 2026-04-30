//#region \0vite/modulepreload-polyfill.js
(function polyfill() {
	const relList = document.createElement("link").relList;
	if (relList && relList.supports && relList.supports("modulepreload")) return;
	for (const link of document.querySelectorAll("link[rel=\"modulepreload\"]")) processPreload(link);
	new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type !== "childList") continue;
			for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
		}
	}).observe(document, {
		childList: true,
		subtree: true
	});
	function getFetchOpts(link) {
		const fetchOpts = {};
		if (link.integrity) fetchOpts.integrity = link.integrity;
		if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
		if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
		else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
		else fetchOpts.credentials = "same-origin";
		return fetchOpts;
	}
	function processPreload(link) {
		if (link.ep) return;
		link.ep = true;
		const fetchOpts = getFetchOpts(link);
		fetch(link.href, fetchOpts);
	}
})();
//#endregion
//#region src/utils/constants.js
var COVERS_URL = "https://covers.openlibrary.org";
var BASE_URL = "https://openlibrary.org";
var STORAGE_KEY = "favoriteBooks";
var THEME_KEY = "theme";
var DARK_THEME = "dark-theme";
//#endregion
//#region src/data/config.js
var appConfig = {
	header: {
		logo: "The Library",
		description: "Discover your next favorite book",
		themeText: "Theme:"
	},
	searchSection: {
		title: "Discover Your Next Great Read",
		description: "Search millions of books, build your personal library, and never lose track of what to read next.",
		inputPlaceholder: "Search for books by title or author...",
		buttonText: "search",
		fetchError: "Failed to load books. Please try again.",
		notFound: "No books found!",
		emptyQuery: "Please enter a search query"
	},
	favorites: {
		title: "Favorites",
		description: "books saved",
		emptyList: "No favorite books yet",
		redHeart: "🩷",
		whiteHeart: "🤍"
	},
	footer: {
		api: {
			title: "Powered by",
			link: {
				title: "Open Library",
				url: BASE_URL
			}
		},
		developer: {
			title: "Developed by",
			link: {
				title: "Dzmitry Kaptsiuh",
				url: "https://github.com/Kaptsiuh"
			}
		}
	}
};
//#endregion
//#region src/utils/domUtils.js
function createElement(tag, className, ...children) {
	const element = document.createElement(tag);
	if (className) element.className = className;
	element.append(...children);
	return element;
}
function showLoader(container) {
	const loader = createElement("div", "loading");
	container.innerHTML = "";
	container.append(loader);
}
function showMessage(container, className, message) {
	const errorMessage = createElement("div", className, message);
	container.innerHTML = "";
	container.append(errorMessage);
}
//#endregion
//#region src/components/Footer.js
function createFooter() {
	return createElement("footer", "footer", createElement("div", "footer__container container", createApiSection(), createDeveloperSection()));
}
function createApiSection() {
	const apiTitle = createElement("h3", "api__title", appConfig.footer.api.title);
	const apiLink = createElement("a", "api__link", appConfig.footer.api.link.title);
	apiLink.href = appConfig.footer.api.link.url;
	apiLink.target = "_blank";
	return createElement("div", "api", apiTitle, apiLink);
}
function createDeveloperSection() {
	const developerTitle = createElement("h3", "developer__title", appConfig.footer.developer.title);
	const developerLink = createElement("a", "developer__link", appConfig.footer.developer.link.title);
	developerLink.href = appConfig.footer.developer.link.url;
	developerLink.target = "_blank";
	return createElement("div", "developer", developerTitle, developerLink);
}
//#endregion
//#region src/assets/book.svg
var book_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12%207V21'%20stroke='%23F8F6F1'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M3%2018C2.73478%2018%202.48043%2017.8946%202.29289%2017.7071C2.10536%2017.5196%202%2017.2652%202%2017V4C2%203.73478%202.10536%203.48043%202.29289%203.29289C2.48043%203.10536%202.73478%203%203%203H8C9.06087%203%2010.0783%203.42143%2010.8284%204.17157C11.5786%204.92172%2012%205.93913%2012%207C12%205.93913%2012.4214%204.92172%2013.1716%204.17157C13.9217%203.42143%2014.9391%203%2016%203H21C21.2652%203%2021.5196%203.10536%2021.7071%203.29289C21.8946%203.48043%2022%203.73478%2022%204V17C22%2017.2652%2021.8946%2017.5196%2021.7071%2017.7071C21.5196%2017.8946%2021.2652%2018%2021%2018H15C14.2044%2018%2013.4413%2018.3161%2012.8787%2018.8787C12.3161%2019.4413%2012%2020.2044%2012%2021C12%2020.2044%2011.6839%2019.4413%2011.1213%2018.8787C10.5587%2018.3161%209.79565%2018%209%2018H3Z'%20stroke='%23F8F6F1'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e";
//#endregion
//#region src/services/theme.js
function initTheme() {
	if (loadTheme() === "dark") document.body.classList.add(DARK_THEME);
}
function loadTheme() {
	return localStorage.getItem("theme") || "light";
}
//#endregion
//#region src/components/Header.js
function createHeader() {
	return createElement("header", "header", createElement("div", "header__container container", createElement("div", "logo-wrapper", createLogoLink(), createTitleSection()), createThemeSwitch()));
}
function createLogoLink() {
	const homeImg = createElement("img");
	homeImg.src = book_default;
	homeImg.alt = "Home";
	const link = createElement("a", "logo-link", homeImg);
	link.href = "/";
	return link;
}
function createTitleSection() {
	return createElement("div", "logo", createElement("h1", "logo__title", appConfig.header.logo), createElement("p", "logo__description", appConfig.header.description));
}
function createThemeSwitch() {
	const checkbox = createElement("input", "theme-checkbox");
	const span = createElement("span", "theme-slider");
	checkbox.type = "checkbox";
	checkbox.id = "theme-toggle";
	checkbox.checked = loadTheme() === "dark";
	const label = createElement("label", "theme-label", span);
	label.htmlFor = "theme-toggle";
	const wrapper = createElement("div", "theme-wrapper", createElement("span", "theme-text", appConfig.header.themeText), checkbox, label);
	checkbox.addEventListener("change", (e) => {
		const theme = e.target.checked ? "dark" : "light";
		document.body.classList.toggle(DARK_THEME, e.target.checked);
		localStorage.setItem(THEME_KEY, theme);
	});
	return wrapper;
}
//#endregion
//#region src/services/booksApi.js
var cache = /* @__PURE__ */ new Map();
async function getBooks(searchQuery, signal = null, offset = 0) {
	const params = new URLSearchParams({
		q: searchQuery || "popular",
		limit: 20,
		offset
	});
	const cacheKey = `${searchQuery || "popular"}_offset_${offset}`;
	if (cache.has(cacheKey)) {
		console.log("Returning cached data for", cacheKey);
		return cache.get(cacheKey);
	}
	try {
		const response = await fetch(`${BASE_URL}/search.json?${params}`, { signal });
		if (!response.ok) {
			console.error(`http error! status: ${response.status}`);
			return [];
		}
		const books = (await response.json()).docs || [];
		cache.set(cacheKey, books);
		return books;
	} catch (error) {
		if (cache.has(cacheKey)) cache.delete(cacheKey);
		console.error(`Error fetching books: ${error}`);
		return [];
	}
}
function clearSearchCache() {
	cache.clear();
}
//#endregion
//#region src/services/storage.js
function loadFavorites() {
	const favorites = localStorage.getItem(STORAGE_KEY);
	return favorites ? JSON.parse(favorites) : [];
}
function saveFavorite(book) {
	const favorites = loadFavorites();
	if (!favorites.some((fav) => fav.key === book.key)) {
		favorites.push({
			title: book.title,
			authorName: book.authorName,
			coverId: book.coverId,
			key: book.key
		});
		localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
	}
}
function removeFromFavorites(key) {
	const updatedFavorites = loadFavorites().filter((book) => book.key !== key);
	localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFavorites));
}
function isFavorite(key) {
	return loadFavorites().some((book) => book.key === key);
}
//#endregion
//#region src/utils/urlUtils.js
function getCoverUrl(coverId) {
	if (!coverId) return null;
	return `${COVERS_URL}/b/id/${coverId}.jpg`;
}
function getBookUrl(key) {
	return `${BASE_URL}${key}`;
}
//#endregion
//#region src/assets/heart.svg
var heart_default = "data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12.6667%209.33333C13.66%208.36%2014.6667%207.19333%2014.6667%205.66667C14.6667%204.69421%2014.2804%203.76158%2013.5928%203.07394C12.9051%202.38631%2011.9725%202%2011%202C9.82671%202%209.00004%202.33333%208.00004%203.33333C7.00004%202.33333%206.17337%202%205.00004%202C4.02758%202%203.09495%202.38631%202.40732%203.07394C1.71968%203.76158%201.33337%204.69421%201.33337%205.66667C1.33337%207.2%202.33337%208.36667%203.33337%209.33333L8.00004%2014L12.6667%209.33333Z'%20stroke='%237C736A'%20stroke-width='1.33333'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e";
//#endregion
//#region src/assets/cover.svg
var cover_default = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTUwIiB2aWV3Qm94PSIwIDAgMTAwIDE1MCI+CiAgPHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxNTAiIGZpbGw9IiNjNGI4YTgiLz4KICA8dGV4dCB4PSI1MCIgeT0iNzgiIGZvbnQtc2l6ZT0iMTEiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjN2M3MzZhIj5ObyBjb3ZlcjwvdGV4dD4KPC9zdmc+";
//#endregion
//#region src/components/Favorites.js
function createFavorites() {
	return createElement("aside", "favorites", createTitleWrapper(), createFavoritesList());
}
function createTitleWrapper() {
	const favoriteImg = createElement("img", "favorites__title-img");
	favoriteImg.src = heart_default;
	favoriteImg.alt = "Favorite";
	const title = createElement("h2", "favorites__title", appConfig.favorites.title);
	const booksCount = loadFavorites().length;
	return createElement("div", "favorites__title-wrapper", favoriteImg, title, createElement("p", "favorites__title-description", `${booksCount} ${appConfig.favorites.description}`));
}
function createFavoritesList() {
	const favoritesList = createElement("ul", "favorites__list");
	const savedFavorites = loadFavorites();
	if (savedFavorites.length === 0) {
		const emptyMessage = createElement("p", "favorites__empty", appConfig.favorites.emptyList);
		favoritesList.append(emptyMessage);
	} else savedFavorites.forEach((book) => {
		favoritesList.append(createFavoriteItem(book, updateFavorites));
	});
	return favoritesList;
}
function createFavoriteItem(book, updateFavoritesCallback) {
	const link = createElement("a", "favorites__item", createCover$1(book), createInfo(book), createFavoriteButton$1(book, updateFavoritesCallback));
	link.href = getBookUrl(book.key);
	link.target = "_blank";
	return createElement("li", "", link);
}
function createCover$1(book) {
	const cover = createElement("img", "favorites__cover");
	const coverUrl = getCoverUrl(book.coverId);
	cover.src = coverUrl ? coverUrl : cover_default;
	cover.alt = `Cover of ${book.title}`;
	return cover;
}
function createInfo(book) {
	return createElement("div", "favorites__info", createElement("h3", "favorites__book-title", book.title), createElement("p", "favorites__book-author", book.authorName));
}
function createFavoriteButton$1(book, updateFavoritesCallback) {
	const favoriteBtn = createElement("button", "favorites__remove", appConfig.favorites.redHeart);
	favoriteBtn.addEventListener("click", (e) => {
		e.preventDefault();
		e.stopPropagation();
		removeFromFavorites(book.key);
		if (updateFavoritesCallback) updateFavoritesCallback();
		updateBookCardHeart(book.key);
	});
	return favoriteBtn;
}
function updateFavorites() {
	const favoritesAside = document.querySelector(".favorites");
	if (favoritesAside) {
		const newFavorites = createFavorites();
		favoritesAside.replaceWith(newFavorites);
	}
}
function updateBookCardHeart(bookKey) {
	document.querySelectorAll(".book-card").forEach((card) => {
		const link = card.querySelector("a");
		if (link && link.href.includes(bookKey)) {
			const favoriteBtn = card.querySelector(".book-card__favorite");
			if (favoriteBtn) favoriteBtn.textContent = isFavorite(bookKey) ? appConfig.favorites.redHeart : appConfig.favorites.whiteHeart;
		}
	});
}
//#endregion
//#region src/components/Book.js
function createBookCard(book) {
	const link = createLink(book);
	const bookCover = createCover(book);
	const cardContent = createContent(book);
	link.append(bookCover, cardContent);
	return createElement("li", "book-card", link);
}
function createLink(book) {
	const link = createElement("a");
	link.href = getBookUrl(book.key);
	link.target = "_blank";
	return link;
}
function createCover(book) {
	const bookCover = createElement("img", "book-card__cover");
	const coverUrl = getCoverUrl(book.coverId);
	bookCover.src = coverUrl ? coverUrl : cover_default;
	bookCover.alt = `Cover of ${book.title}`;
	return bookCover;
}
function createContent(book) {
	return createElement("div", "book-card__content", createElement("h3", "book-card__title", book.title), createElement("p", "book-card__author", book.authorName), createElement("p", "book-card__year", book.firstPublishYear), createFavoriteButton(book));
}
function createFavoriteButton(book) {
	const favoriteBtn = createElement("button", "book-card__favorite");
	updateHeart(favoriteBtn, book.key);
	favoriteBtn.addEventListener("click", (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (isFavorite(book.key)) removeFromFavorites(book.key);
		else saveFavorite(book);
		updateHeart(favoriteBtn, book.key);
		updateFavoritesSidebar();
	});
	return favoriteBtn;
}
function updateFavoritesSidebar() {
	const favoritesSidebar = document.querySelector(".favorites");
	if (favoritesSidebar) {
		const newFavorites = createFavorites();
		favoritesSidebar.replaceWith(newFavorites);
	}
}
function updateHeart(button, key) {
	button.textContent = isFavorite(key) ? appConfig.favorites.redHeart : appConfig.favorites.whiteHeart;
}
//#endregion
//#region src/utils/transformBook.js
function transformBook(book) {
	return {
		title: book.title,
		authorName: book?.author_name?.at(0) || "Unknown author",
		firstPublishYear: book.first_publish_year || "Unknown year",
		coverId: book.cover_i,
		key: book.key
	};
}
//#endregion
//#region src/services/pagination.js
var pagination = {
	offset: 0,
	isLoading: false,
	hasMore: true,
	scrollHandler: null
};
function resetPagination() {
	pagination.offset = 0;
	pagination.isLoading = false;
	pagination.hasMore = true;
	if (pagination.scrollHandler) {
		window.removeEventListener("scroll", pagination.scrollHandler);
		pagination.scrollHandler = null;
	}
}
function onScroll(callback) {
	if (pagination.scrollHandler) window.removeEventListener("scroll", pagination.scrollHandler);
	pagination.scrollHandler = () => {
		if (pagination.isLoading || !pagination.hasMore) return;
		const scrollPosition = window.scrollY + window.innerHeight;
		if (document.documentElement.scrollHeight - scrollPosition < window.innerHeight) callback();
	};
	window.addEventListener("scroll", pagination.scrollHandler);
}
//#endregion
//#region src/components/Books.js
async function loadBooks(parentNode, searchQuery, signal = null, isLoadMore = false) {
	if (!parentNode) {
		console.error("parentNode is required for loadBooks");
		return;
	}
	let booksContainer = parentNode.querySelector(".books");
	if (!booksContainer) {
		booksContainer = createElement("div", "books");
		const booksList = createElement("ul", "books-container");
		const favorite = createFavorites();
		booksContainer.append(booksList, favorite);
		parentNode.append(booksContainer);
	}
	const booksListContainer = booksContainer.querySelector(".books-container");
	if (!isLoadMore) {
		resetPagination();
		showLoader(booksListContainer);
	}
	pagination.isLoading = true;
	try {
		let books = await getBooks(searchQuery, signal, pagination.offset);
		if (signal?.aborted) return;
		if (!Array.isArray(books)) books = [];
		const transformedBooks = books.map(transformBook);
		if (!isLoadMore) {
			const newBooks = createBooks(transformedBooks);
			booksListContainer.innerHTML = "";
			booksListContainer.append(newBooks);
		} else transformedBooks.forEach((book) => {
			booksListContainer.append(createBookCard(book));
		});
		pagination.offset += 20;
		pagination.hasMore = books.length === 20;
		if (!isLoadMore && pagination.hasMore) onScroll(() => loadBooks(parentNode, searchQuery, null, true));
	} catch (error) {
		console.error("Error loading books:", error);
		if (!isLoadMore) showMessage(booksListContainer, "error-message", appConfig.searchSection.fetchError);
	} finally {
		pagination.isLoading = false;
	}
}
function createBooks(books) {
	const fragment = document.createDocumentFragment();
	if (!books.length) {
		showMessage(fragment, "books__no-results", appConfig.searchSection.notFound);
		return fragment;
	}
	books.forEach((book) => {
		fragment.append(createBookCard(book));
	});
	return fragment;
}
//#endregion
//#region src/assets/search.svg
var search_default = "data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M9.16667%2015.8333C12.8486%2015.8333%2015.8333%2012.8486%2015.8333%209.16667C15.8333%205.48477%2012.8486%202.5%209.16667%202.5C5.48477%202.5%202.5%205.48477%202.5%209.16667C2.5%2012.8486%205.48477%2015.8333%209.16667%2015.8333Z'%20stroke='%237C736A'%20stroke-width='1.66667'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M17.5%2017.5L13.9166%2013.9167'%20stroke='%237C736A'%20stroke-width='1.66667'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e";
//#endregion
//#region src/utils/debounce.js
function debounce(func, delay) {
	let timeoutId;
	let abortController = null;
	const debounced = function(...args) {
		clearTimeout(timeoutId);
		if (abortController) abortController.abort();
		timeoutId = setTimeout(() => {
			abortController = new AbortController();
			func.apply(this, [...args, abortController.signal]);
		}, delay);
	};
	debounced.cancel = () => {
		clearTimeout(timeoutId);
		if (abortController) abortController.abort();
	};
	return debounced;
}
//#endregion
//#region src/components/Search.js
function createSearch() {
	return createElement("section", "search", createElement("h2", "search__title", appConfig.searchSection.title), createElement("p", "search__description", appConfig.searchSection.description), createForm());
}
function createForm() {
	const icon = createElement("img", "search__input-icon");
	icon.src = search_default;
	icon.alt = "Search";
	const input = createElement("input", "search__input");
	input.id = "search-input";
	input.type = "text";
	input.placeholder = appConfig.searchSection.inputPlaceholder;
	const debouncedSearch = debounce((query, signal) => {
		handleSearch(query, signal);
	}, 1e3);
	input.addEventListener("input", (e) => {
		debouncedSearch(e.target.value.trim());
	});
	input.addEventListener("keydown", (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			debouncedSearch.cancel();
			handleSearch(input.value.trim());
		}
	});
	const inputWrapper = createElement("div", "search__input-wrapper", icon, input);
	const button = createElement("button", "search__button", appConfig.searchSection.buttonText);
	button.addEventListener("click", () => {
		debouncedSearch.cancel();
		handleSearch(input.value.trim());
	});
	return createElement("div", "search__form", inputWrapper, button);
}
async function handleSearch(searchQuery, signal = null) {
	const mainElement = document.querySelector(".main");
	if (!mainElement) {
		console.error("main element not found");
		return;
	}
	if (!searchQuery) {
		const booksSection = mainElement.querySelector(".books");
		if (!booksSection) {
			console.error("books section not found");
			return;
		}
		const booksContainer = booksSection.querySelector(".books-container");
		if (!booksContainer) {
			console.error("books container not found");
			return;
		}
		showMessage(booksContainer, "error-message", appConfig.searchSection.emptyQuery);
		return;
	}
	await loadBooks(mainElement, searchQuery, signal);
}
//#endregion
//#region src/components/Main.js
function createMain() {
	const main = createElement("main", "main container", createSearch());
	loadBooks(main);
	return main;
}
//#endregion
//#region src/main.js
initTheme();
function initApp() {
	const header = createHeader();
	const main = createMain();
	const footer = createFooter();
	document.body.append(header, main, footer);
	setInterval(clearSearchCache, 300 * 1e3);
}
document.addEventListener("DOMContentLoaded", initApp);
//#endregion
