/* eslint-disable object-shorthand */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable vars-on-top */
/* eslint-disable strict */
/* eslint-disable no-var */
/* eslint-disable complexity */
(function (algolia) {
  'use strict';
  var instantsearch = algolia.externals.instantsearch;
  var algoliasearch = algolia.externals.algoliasearch;
  var searchBox = algolia.externals.widgets.searchBox;
  var stats = algolia.externals.widgets.stats;
  var sortBy = algolia.externals.widgets.sortBy;
  var clearRefinements = algolia.externals.widgets.clearRefinements;
  var panel = algolia.externals.widgets.panel;
  var hits = algolia.externals.widgets.hits;
  var pagination = algolia.externals.widgets.pagination;
  var configure = algolia.externals.widgets.configure;
  var connectCurrentRefinements =
    algolia.externals.connectors.connectCurrentRefinements;
  const insightsClient = algolia.externals.insightsClient;
  let firstRender = true;


  var instant = {
    colors: algolia.config.colors,
    distinct: Boolean(algolia.config.show_products),
    facets: {
      hidden:
        collectionPageEnabled && algolia.collectionHiddenFacets
          ? algolia.collectionHiddenFacets
          : algolia.hiddenFacets,
      shown:
        collectionPageEnabled && algolia.collectionShownFacets
          ? algolia.collectionShownFacets
          : algolia.shownFacets,
      list:
        collectionPageEnabled && algolia.collectionFacets
          ? algolia.collectionFacets
          : algolia.facets,
      widgets:
        collectionPageEnabled && algolia.collectionFacetsWidgets
          ? algolia.collectionFacetsWidgets
          : algolia.facetsWidgets,
    },
    hitsPerPage:
      collectionPageEnabled &&
        algolia.config.collections_full_results_hits_per_page
        ? algolia.config.collections_full_results_hits_per_page
        : algolia.config.products_full_results_hits_per_page,
    search: instantsearch({
      searchClient: algoliasearch(
        algolia.config.app_id,
        algolia.config.search_api_key
      ),
      indexName: algolia.config.index_prefix + 'products',
      routing: {
        stateMapping: singleIndex(algolia.config.index_prefix + 'products'),
      },
      searchFunction: function (searchFunctionHelper) {
        // Set query parameters here because they're not kept when someone
        // presses the Back button if set in the `init` function of a custom widget
        var page = searchFunctionHelper.getPage();
        if (instant.distinct) {
          searchFunctionHelper.setQueryParameter('distinct', true);
        }

        // Assign any required filters
        if (searchFilters.length) {
          searchFunctionHelper.setQueryParameter(
            'filters',
            searchFilters.join(' AND ')
          );
        }

        // Assign any required `ruleContexts` which are required for query rules
        // targeting collection pages
        if (collectionPageEnabled) {
          // Collection page merchandising:
          // If we are on a collection page, `collectionRulesContextValue` is defined
          if (collectionRulesContextValue) {
            searchFunctionHelper.setQueryParameter('ruleContexts', [
              collectionRulesContextValue.toString(),
            ]);
          } else {
            searchFunctionHelper.setQueryParameter('ruleContexts', []);
          }
        }

        searchFunctionHelper.setPage(page);
        searchFunctionHelper.search();
      },
    }),
    selector: results_selector + ', .algolia-shopify-instantsearch',
    sortOrders: activeSortOrders
  };

  instant.search.addWidgets([
    configure({
      hitsPerPage: instant.hitsPerPage,
      facetingAfterDistinct: Boolean(algolia.config.show_products),
      maxValuesPerFacet: 5,
    }),
  ]);


})(window.algoliaShopify);
