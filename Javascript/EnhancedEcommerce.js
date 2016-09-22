/**
 * Guide for implementing Enhanced Ecommerce via Google Tag Manager. This guide is meant for developers.
 * We recommend starting with Step 1, then Step 2, Step 3 and so forth.
 * More info: https://developers.google.com/tag-manager/enhanced-ecommerce
 * Here is a live demo of Enhanced Ecommerce: https://enhancedecommerce.appspot.com/ . The demo doesn't just show samples, it's actually sending real data to Google Analytics. If you'd like to inspect the hits, just open up the developer tools or use the Google Analytics Debugger ( https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna ) to see what's going on.
 *
 * @Author: Stian Rismyhr, stian.rismyhr@iprospect.com
 */

/**
 * Step 1 - Purchases
 * More info: https://developers.google.com/tag-manager/enhanced-ecommerce#purchases
 */

// Codeindex 1.1
// Send transaction data with a pageview if available when the page loads. Otherwise, use an event when the transaction data becomes available.
// IMPORTANT: The DataLayer(s) in this section must be loaded before the GTM-code
<script>
dataLayer.push({
	'ecommerce': {
		'purchase': {
			'actionField': {
				'id': '12345678', // Transaction ID. Required for purchases and refunds.
				'affiliation': 'kondomeriet.no', // colorline.no, colorline.de
				'revenue': '407', // Total transaction value (incl. tax and shipping)
				'tax':'101.75', // Tax or moms
				'shipping': '99', // Total shipping costs
				'coupon': 'BIL1001' // Optional fields may be omitted or set to empty string.
			},
			'products': [{ // List of productFieldObjects.
				'name': 'kondomeriet', // Name or ID is required.
				'id': '1111',
				'price': '149',
				'brand': 'Chanel',
				'category': 'Strømpebukser',
				'variant': 'M/L',
				'quantity': 1,
				'coupon': '' // Optional fields may be omitted or set to empty string.
			},
      {
        'name': 'Elefant penisring',
        'id': '2222',
        'price': '159',
        'brand': 'XXX',
        'category': 'Penisring',
        'variant': 'Black',
        'quantity': 1,
        'coupon': '' // Optional fields may be omitted or set to empty string.
      }]
		}
	}
});
</script>

/**
 * Step 2 - Checkout Funnel
 * More info: https://developers.google.com/tag-manager/enhanced-ecommerce#checkout
 */

// Codeindex 2.1
// Measure a step in the checkout funnel. First step could be Handlekurv. Increment the step variable for each step. This code is not needed on the purchase step.
// IMPORTANT: The DataLayer(s) in this section must be loaded before the GTM-code
// Below is an example with 3 checkout steps before the Purchase Completed step
<script>
dataLayer.push({
	'event': 'checkout',
	'ecommerce': {
		'checkout': {
			'actionField': {'step': 1, 'option': 'Visa'}, // The option field can be used to provide a piece of additional data about the page, such as the payment type that was selected by the user.
			'products': [{
          	  'name': 'Triblend Android T-Shirt',
          	  'id': '12345',
          	  'price': '15.25',
          	  'brand': 'Google',
          	  'category': 'Apparel',
          	  'variant': 'Gray',
          	  'quantity': 1
			}]
		}
	}
});
</script>

// Codeindex 2.2
<script>
dataLayer.push({
	'event': 'checkout',
	'ecommerce': {
		'checkout': {
			'actionField': {'step': 2, 'option': ''}, // The option field can be used to provide a piece of additional data about the page, such as the payment type that was selected by the user.
			'products': [{
          	  'name': 'Triblend Android T-Shirt',
          	  'id': '12345',
          	  'price': '15.25',
          	  'brand': 'Google',
          	  'category': 'Apparel',
          	  'variant': 'Gray',
          	  'quantity': 1
			}]
		}
	}
});
</script>

// Codeindex 2.3
<script>
dataLayer.push({
	'event': 'checkout',
	'ecommerce': {
		'checkout': {
			'actionField': {'step': 3, 'option': ''}, // The option field can be used to provide a piece of additional data about the page, such as the payment type that was selected by the user.
			'products': [{
          	  'name': 'Triblend Android T-Shirt',
          	  'id': '12345',
          	  'price': '15.25',
          	  'brand': 'Google',
          	  'category': 'Apparel',
          	  'variant': 'Gray',
          	  'quantity': 1
			}]
		}
	}
});
</script>

// Codeindex 2.4
<script>
dataLayer.push({
	'event': 'checkout',
	'ecommerce': {
		'checkout': {
			'actionField': {'step': 3, 'option': ''}, // The option field can be used to provide a piece of additional data about the page, such as the payment type that was selected by the user.
			'products': [{
          	  'name': 'Triblend Android T-Shirt',
          	  'id': '12345',
          	  'price': '15.25',
          	  'brand': 'Google',
          	  'category': 'Apparel',
          	  'variant': 'Gray',
          	  'quantity': 1
			}]
		}
	}
});
</script>

// Codeindex 2.1.1
// Optional step. The checkout option is useful in cases where you've already measured a checkout step but you want to capture additional information about
// the same checkout step. For example, the shipping method selected by a user, if a user is logged in, new users or guest.
// Replace step with 1,2,3 etc. and checkoutOption with "New Customer", "Guest", "Existing Customer", "Pickup" etc. dependant on the step in the funnel.
<script>
dataLayer.push({
  'event': 'checkoutOption',
  'ecommerce': {
    'checkout_option': {
      'actionField': {'step': step, 'option': checkoutOption}
    }
  }
});
</script>


/**
 * Step 3 - Shopping Cart
 * More info: https://developers.google.com/tag-manager/enhanced-ecommerce#cart
 */

// Codeindex 3.1
// Measure adding a product to a shopping cart by using an 'add' actionFieldObject and a list of productFieldObjects.
// This code must trigger when a user clicks on a button to ADD a product to the shopping cart
<script>
dataLayer.push({
  'event': 'addToCart',
  'ecommerce': {
    'currencyCode': 'NOK',
    'add': {                                // 'add' actionFieldObject measures.
      'products': [{                        //  adding a product to a shopping cart.
        'name': 'Triblend Android T-Shirt',
        'id': '12345',
        'price': '15.25',
        'brand': 'Google',
        'category': 'Apparel',
        'variant': 'Gray',
        'quantity': 1
       }]
    }
  }
});
</script>

// Codeindex 3.2
// Measure the removal of a product from a shopping cart
// This code must trigger when a user clicks on a button to REMOVE a product from the shopping cart
<script>
dataLayer.push({
  'event': 'removeFromCart',
  'ecommerce': {
    'remove': {                               // 'remove' actionFieldObject measures.
      'products': [{                          //  removing a product to a shopping cart.
          'name': 'Triblend Android T-Shirt',
          'id': '12345',
          'price': '15.25',
          'brand': 'Google',
          'category': 'Apparel',
          'variant': 'Gray',
          'quantity': 1
      }]
    }
  }
});
</script>

/**
 * Step 4 - Product Impressions
 * More info: https://developers.google.com/tag-manager/enhanced-ecommerce#product-impressions
 *
 * Measures impressions of a product. Every time a product is displayed. Here in an example, every product on this page https://enhancedecommerce.appspot.com/ gets one impression.
 */

// Codeindex 4.1
<script>
dataLayer.push({
  'ecommerce': {
    'currencyCode': 'NOK',                       // Local currency is optional.
    'impressions': [
     {
       'name': 'Triblend Android T-Shirt',       // Name or ID is required.
       'id': '12345',
       'price': '15.25',
       'brand': 'Google',
       'category': 'Apparel',
       'variant': 'Gray',
       'list': 'Search Results',
       'position': 1
     },
     {
       'name': 'Donut Friday Scented T-Shirt',
       'id': '67890',
       'price': '33.75',
       'brand': 'Google',
       'category': 'Apparel',
       'variant': 'Black',
       'list': 'Search Results',
       'position': 2
     }]
  }
});
</script>

/**
 * Step 5 - Product Clicks
 * More info: https://developers.google.com/tag-manager/enhanced-ecommerce#product-clicks
 *
 * Measure clicks on product links. Needs to trigger when a product is clicked.
 */

// Codeindex 5.1
dataLayer.push({
	'event': 'productClick',
	'ecommerce': {
		'click': {
			'actionField': {'list': 'Search Results'},      // Optional list property.
			'products': [{
				'name': 'Triblend Android T-Shirt',       // Name or ID is required.
				'id': '12345',
				'price': '15.25',
				'brand': 'Google',
				'category': 'Apparel',
				'variant': 'Gray'
			}]
		}
	}
});


/**
 * Step 6 - Product Details
 * More info: https://developers.google.com/tag-manager/enhanced-ecommerce#details
 *
 * Measure a view of product details. This example assumes the detail view occurs on pageload, and also tracks a standard pageview of the details page.
 */

// Codeindex 6.1
<script>
dataLayer.push({
  'ecommerce': {
    'detail': {
      'actionField': {'list': 'Apparel Gallery'},    // 'detail' actions have an optional list property.
      'products': [{
        'name': 'Triblend Android T-Shirt',         // Name or ID is required.
        'id': '12345',
        'price': '15.25',
        'brand': 'Google',
        'category': 'Apparel',
        'variant': 'Gray'
       }]
     }
   }
});
</script>

/**
 * Step 7 - Promotion Impressions
 * More info: https://developers.google.com/tag-manager/enhanced-ecommerce#promo-impressions
 *
 * An example of measuring promotion views. This example assumes that information about the promotions displayed is available when the page loads.
 */

// Codeindex 7.1
// IMPORTANT: The DataLayer(s) in this section must be loaded before the GTM-code
<script>
dataLayer.push({
  'ecommerce': {
    'promoView': {
      'promotions': [	// Array of promoFieldObjects.
       {
         'id': 'JUNE_PROMO13',	// ID or Name is required.
         'name': 'June Sale',
         'creative': 'banner1',
         'position': 'slot1'
       },
       {
         'id': 'FREE_SHIP13',
         'name': 'Free Shipping Promo',
         'creative': 'skyscraper1',
         'position': 'slot2'
       }]
    }
  }
});
</script>

/**
 * Step 8 - Promotion Clicks
 * More info: https://developers.google.com/tag-manager/enhanced-ecommerce#promo-clicks
 *
 * Call this function when a user clicks on a promotion. This function uses the eventCallBack datalayer variable to handle navigation after the ecommerce data is sent to Google Analytics.
 *
 * @param {Object} promoObj An object representing an internal site promotion.
 */

// Codeindex 8.1
<script>
function onPromoClick(promoObj) {
  dataLayer.push({
    'event': 'promotionClick',
    'ecommerce': {
      'promoClick': {
        'promotions': [
         {
           'id': promoObj.id, // Name or ID is required.
           'name': promoObj.name,
           'creative': promoObj.creative,
           'position': promoObj.pos
         }]
      }
    },
    'eventCallback': function() {
      document.location = promoObj.destinationUrl;
    }
  });
}
</script>

/**
 * Step 9 - Refunds
 * More info: https://developers.google.com/tag-manager/enhanced-ecommerce#refunds
 *
 * Used to refund a full or partial transaction based on the transaction ID.
 */

// Codeindex 9.1 - Full Refund
// IMPORTANT: The DataLayer(s) in this section must be loaded before the GTM-code
// Refund an entire transaction by providing the transaction ID. This example assumes the details of the completed refund are available when the page loads:
<script>
dataLayer.push({
  'ecommerce': {
    'refund': {
      'actionField': {'id': 'T12345'} // Transaction ID. Required for purchases and refunds.
    }
  }
});
</script>

// Codeindex 9.2 - Partial Refund
// IMPORTANT: The DataLayer(s) in this section must be loaded before the GTM-code
// Measure a partial refund by providing an array of productFieldObjects and specifying the ID and quantity of each product being returned. This example assumes the partial refund details are known at the time the page loads:
<script>
dataLayer.push({
  'ecommerce': {
    'refund': {
      'actionField': {'id': 'T12345'}, // Transaction ID.
      'products': [
            {'id': 'P4567', 'quantity': 1}, // Product ID and quantity. Required for partial refunds.
            {'id': 'P8901','quantity': 2}
       ]
     }
  }
});
</script>
