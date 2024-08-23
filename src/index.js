const SearchParamsKeys = {
	URL: 'url',
	ValuePath: 'valuePath',
};

const CommonContent = {
	IncorrectURL: 'Incorrect URL',
	IncorrectValuePath: 'Incorrect value path',
	BadResponse: 'Something wrong with response'
};

const searchParamsKeysErrorToContentMapping = {
	[SearchParamsKeys.URL]: CommonContent.IncorrectURL,
	[SearchParamsKeys.ValuePath]: CommonContent.IncorrectValuePath,
};

const corsProxyURL = 'https://corsproxy.io/?';

function makeRequestURL(url) {
	return corsProxyURL + encodeURIComponent(url);
}

function renderContent(content) {
	const root = document.getElementById('root');

	root.innerHTML = '';

	const contentElement = document.createElement('h1');
	contentElement.innerText = content;

	root.appendChild(contentElement);
}

async function main() {
	const searchParams = new URLSearchParams(window.location.search);

	for (const key of Object.values(SearchParamsKeys)) {
		if (!searchParams.has(key)) {
			return renderContent(searchParamsKeysErrorToContentMapping[key]);
		}
	}

	const url = searchParams.get(SearchParamsKeys.URL);

	try {
		new URL(url);
	} catch {
		return renderContent(CommonContent.IncorrectURL);
	}

	const path = searchParams.get(SearchParamsKeys.ValuePath).split('.');

	if (path.length === 0) {
		return renderContent(CommonContent.IncorrectValuePath);
	}

	try {
		const response = await fetch(makeRequestURL(url));
	
		const data = await response.json();

		let value = data;

		for (const key of path) {
			value = value?.[key];
		}

		return renderContent(String(value));
	} catch (error) {
		console.error(error);
		
		return renderContent(CommonContent.BadResponse);
	}
}

main();
