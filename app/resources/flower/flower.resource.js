import angular from 'angular';
import { filter, reject } from 'lodash';

class flower {
  constructor() {
  }

  getSingleQuantityBouquets() {
    let bouquets = this.getBouquets();
    if (bouquets &&
      bouquets.collections[0] &&
      bouquets.collections[0].skus) {

      //filter items where pricing data may not be available & the one's not in STOCK
      let bouquetsWithPricings = reject(bouquets.collections[0].skus, { pricings: null, in_stock: false });

      //filter item with quantity 1 & where order type is not for 'subscription'
      let singleQuantityBouquets = filter(bouquetsWithPricings,
        (item)=> {
          item.pricings = filter(item.pricings, { quantity: 1, order_type: null });
          return item;
        });
      return singleQuantityBouquets;
    }

    //if no valid bouquets data from API
    return [{}];
  }

  getShippingOptions() {
    let bouquets = this.getBouquets();
    if (bouquets &&
      bouquets.collections[0] &&
      bouquets.collections[0].shipping_options) {
      //Transform to new properties
      let shippingOptions = bouquets.collections[0].shipping_options.map(({ shipping_method_id, name, price }) => ({
        id: shipping_method_id,
        name,
        price: Number(price)
      }));
      return shippingOptions;
    }

    //if no shipping options from API
    return [{}];
  }

  /**
   * Get all bouquets.
   * @returns {Array.<Object>} array of objects of flowers
   */
  getBouquets() {
    return {
      'collections': [
        {
          'id': 1,
          'name': 'Letterbox Flowers',
          'slug': 'letterbox',
          'single_only': false,
          'default_order_type': 'Bundle',
          'addons': false,
          'lowest_price': '15.00',
          'shipping_options': [
            {
              'id': 1,
              'collection_id': 1,
              'shipping_method_id': 1,
              'price': '0.0',
              'price_pennies': 0,
              'price_currency': 'GBP',
              'name': 'Royal Mail 1st Class (free)',
              'note_length': 0,
              'shipping_method': null,
              'method_name': 'Royal Mail 1st Class'
            },
            {
              'id': 2,
              'collection_id': 1,
              'shipping_method_id': 2,
              'price': '3.5',
              'price_pennies': 350,
              'price_currency': 'GBP',
              'name': 'Royal Mail Tracked (£3.50 per delivery)',
              'note_length': 24,
              'shipping_method': null,
              'method_name': 'Royal Mail Tracked'
            },
            {
              'id': 21,
              'collection_id': 1,
              'shipping_method_id': 6,
              'price': '5.0',
              'price_pennies': 500,
              'price_currency': 'GBP',
              'name': 'DPD Courier (£5.00 per delivery)',
              'note_length': 50,
              'shipping_method': null,
              'method_name': 'DPD Courier'
            }
          ],
          'skus': [
            {
              'id': 66,
              'name': 'The Evie',
              'collection_id': 1,
              'default_bouquet_id': 242,
              'description': null,
              'slug': 'the-evie',
              'is_addon': false,
              'finlays_display_name': 'The Evie',
              'weight': 0.1,
              'single_only': false,
              'bundle_only': false,
              'collection': null,
              'default_bouquet': {
                'id': 242,
                'name': 'The Evie',
                'description': 'Say goodbye to January with The Evie, our limited edition Letterbox bouquet of blueberry roses, deep-pink lisianthus and wild waxflower that is sure to banish the Winter blues.',
                'instructions': 'Just like us, flowers need a bit of TLC to be at their best. Add flower food to your favourite vase and fill with clean water. Trim each stem at a 45 degree angle and repeat every couple of days to keep your bouquet blooming.\r\nIntroducing The Evie, a wild and wintery bouquet featuring blueberry roses, deep pink lisianthus seasonal eryngium and waxflower. \r\nTo arrange first position your foliage, crossing the stems to make a grid. Trim your lisianthus and roses to different heights and slide between the stems before adding waxflower throughout the bouquet. \r\nNow you’ve styled your blooms, show them off! Share a snap of your #LetterboxFlowers with us on Instagram @bloomandwild and our favourite of the month will win a 3 wick Neom candle and 3 months of letterbox flowers. \r\nGet in touch on hello@bloomandwild.com or 020 7352 9499',
                'collection_id': 1,
                'weekly_bouquet': false,
                'starting_on': '2016-01-21',
                'ending_on': '2016-02-06',
                'appearing_from': '2016-01-22T17:00:00.000+00:00',
                'appearing_to': '2016-02-05T17:00:00.000+00:00',
                'slug': 'the-evie',
                'lily_free': true,
                'visible': true,
                'long_description': 'Say goodbye to January with The Evie, our limited edition Letterbox bouquet. \r\n\r\nThis arrangement of blueberry roses, deep-pink lisianthus and wild waxflower is sure to banish the Winter blues and brighten up any home. \r\n\r\nWe check the quality of each bloom by eye before it is carefully packed by hand, and add protective netting to delicate blooms when necessary, to ensure that your gift will arrive in perfect condition, always.',
                'eighteen_plus': false,
                'substitute_bouquet_id': 173,
                'limited_edition': false,
                'supplier_id': 1,
                'contents': '* 5 Blueberry  Rose\n* 5 Lisianthus\n* 3 Blue Eryngium\n* 3 Pink Waxflower\n* 3 Eucalyptus',
                'image_urls': {
                  'ios_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-evie/ios_carousel/751af5e9967bff4e0190d9b034af1b14.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-evie/ios_carousel/294e9c2f136145213404f6d4286e68f4.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-evie/ios_carousel/6d607cb66588ac5a815ab49920a04a8a.jpg'
                  ],
                  'ios_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-evie/ios_main/6d607cb66588ac5a815ab49920a04a8a.jpg',
                  'ios_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-evie/ios_thumb/6d607cb66588ac5a815ab49920a04a8a.jpg',
                  'website_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-evie/website_carousel/751af5e9967bff4e0190d9b034af1b14.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-evie/website_carousel/294e9c2f136145213404f6d4286e68f4.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-evie/website_carousel/6d607cb66588ac5a815ab49920a04a8a.jpg'
                  ],
                  'website_hero': 'https://assets-0.bloomandwild.com/letterbox-main/the-evie/website_hero/6d607cb66588ac5a815ab49920a04a8a.jpg',
                  'website_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-evie/website_main/6d607cb66588ac5a815ab49920a04a8a.jpg',
                  'website_medium': 'https://assets-0.bloomandwild.com/letterbox-main/the-evie/website_medium/6d607cb66588ac5a815ab49920a04a8a.jpg',
                  'website_small': 'https://assets-0.bloomandwild.com/letterbox-main/the-evie/website_small/6d607cb66588ac5a815ab49920a04a8a.jpg',
                  'ios_upsell': '',
                  'android_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-evie/android_carousel/751af5e9967bff4e0190d9b034af1b14.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-evie/android_carousel/294e9c2f136145213404f6d4286e68f4.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-evie/android_carousel/6d607cb66588ac5a815ab49920a04a8a.jpg'
                  ],
                  'android_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-evie/android_main/6d607cb66588ac5a815ab49920a04a8a.jpg',
                  'android_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-evie/android_thumb/6d607cb66588ac5a815ab49920a04a8a.jpg',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'image_urls_x2': {
                  'ios_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-evie/ios_carousel/751af5e9967bff4e0190d9b034af1b14_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-evie/ios_carousel/294e9c2f136145213404f6d4286e68f4_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-evie/ios_carousel/6d607cb66588ac5a815ab49920a04a8a_x2.jpg'
                  ],
                  'ios_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-evie/ios_main/6d607cb66588ac5a815ab49920a04a8a_x2.jpg',
                  'ios_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-evie/ios_thumb/6d607cb66588ac5a815ab49920a04a8a_x2.jpg',
                  'website_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-evie/website_carousel/751af5e9967bff4e0190d9b034af1b14_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-evie/website_carousel/294e9c2f136145213404f6d4286e68f4_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-evie/website_carousel/6d607cb66588ac5a815ab49920a04a8a_x2.jpg'
                  ],
                  'website_hero': 'https://assets-0.bloomandwild.com/letterbox-main/the-evie/website_hero/6d607cb66588ac5a815ab49920a04a8a_x2.jpg',
                  'website_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-evie/website_main/6d607cb66588ac5a815ab49920a04a8a_x2.jpg',
                  'website_medium': 'https://assets-0.bloomandwild.com/letterbox-main/the-evie/website_medium/6d607cb66588ac5a815ab49920a04a8a_x2.jpg',
                  'website_small': 'https://assets-0.bloomandwild.com/letterbox-main/the-evie/website_small/6d607cb66588ac5a815ab49920a04a8a_x2.jpg',
                  'ios_upsell': '',
                  'android_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-evie/android_carousel/751af5e9967bff4e0190d9b034af1b14_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-evie/android_carousel/294e9c2f136145213404f6d4286e68f4_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-evie/android_carousel/6d607cb66588ac5a815ab49920a04a8a_x2.jpg'
                  ],
                  'android_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-evie/android_main/6d607cb66588ac5a815ab49920a04a8a_x2.jpg',
                  'android_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-evie/android_thumb/6d607cb66588ac5a815ab49920a04a8a_x2.jpg',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'badge': null,
                'unboxing_video_id': null,
                'arrangement_video_id': null,
                'tags': [
                  'flower',
                  'gift',
                  'next-day delivery',
                  'letterbox flowers',
                  'peach',
                  'lily',
                  'birthday',
                  'anniversary',
                  'present',
                  'last minute'
                ]
              },
              'in_stock': true,
              'next_available': '2016-02-02',
              'pricings': [
                {
                  'id': 645,
                  'sku_id': 66,
                  'quantity': 1,
                  'amount': '28.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 644,
                  'sku_id': 66,
                  'quantity': 52,
                  'amount': '795.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 643,
                  'sku_id': 66,
                  'quantity': 26,
                  'amount': '390.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 642,
                  'sku_id': 66,
                  'quantity': 12,
                  'amount': '195.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 641,
                  'sku_id': 66,
                  'quantity': 6,
                  'amount': '100.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 640,
                  'sku_id': 66,
                  'quantity': 3,
                  'amount': '55.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 639,
                  'sku_id': 66,
                  'quantity': 1,
                  'amount': '15.00',
                  'order_type': 'Subscription',
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                }
              ]
            },
            {
              'id': 55,
              'name': 'The Sienna',
              'collection_id': 1,
              'default_bouquet_id': 201,
              'description': null,
              'slug': 'the-sienna',
              'is_addon': false,
              'finlays_display_name': 'The Sienna',
              'weight': 0.2,
              'single_only': false,
              'bundle_only': false,
              'collection': null,
              'default_bouquet': {
                'id': 201,
                'name': 'The Sienna',
                'description': 'Inject some colour into dark winter days with The Sienna, a bright and bold bouquet of sunset-hued blooms. The bold alstroemeria and ombre toned roses will light up any home.',
                'instructions': 'Just like us, flowers need a bit of TLC to be at their best. Add flower food to your favourite vase and fill with clean water. Trim each stem at a 45 degree angle and repeat every couple of days to keep your bouquet blooming.\r\nIntroducing The Sienna, a sunset-hued bouquet of bright alstroemeria and maracuja roses. We send our alstroemeria in bud to protect the delicate petals. Just pop in water and they will begin to bloom within 24 hours, and last for many days. \r\nTo arrange your blooms first position your roses, crossing the stems to make a grid. Trim your alstroemeria to different heights and position in the vase by alternating colours and sliding between the roses to give your arrangement support. \r\nNow you’ve styled your blooms, show them off! Share a snap of your #LetterboxFlowers with us on Instagram @bloomandwild and our favourite of the month will win a 3 wick Neom candle and 3 months of letterbox flowers.\r\nGet in touch on hello@bloomandwild.com or 020 7352 9499',
                'collection_id': 1,
                'weekly_bouquet': false,
                'starting_on': '2016-01-20',
                'ending_on': '2016-02-08',
                'appearing_from': '2016-01-21T17:00:00.000+00:00',
                'appearing_to': '2016-02-05T17:00:00.000+00:00',
                'slug': 'the-sienna',
                'lily_free': true,
                'visible': true,
                'long_description': 'Inject some colour into dark winter days with The Sienna, a bright and bold bouquet of sunset-hued blooms. The bold alstroemeria and ombre toned roses will light up any home. \r\n\r\nWe send our alstroemeria in bud to protect each petal during the journey and so that the full life of the flower can be enjoyed. Within 24 hours of being in water each flower will start to bloom and reveal its hidden beauty.',
                'eighteen_plus': false,
                'substitute_bouquet_id': 173,
                'limited_edition': false,
                'supplier_id': 1,
                'contents': '* 3 Cream Alstroemaria\n* 3 Red Alstroemaria\n* 3 Purple Alstroemeria\n* 3 Yellow Alstroemeria\n* 5 Orange Rose',
                'image_urls': {
                  'ios_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-sienna/ios_carousel/af5e3965c84ef8f1e4485dee124b96ab.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-sienna/ios_carousel/c3a5645afbc929f91f7150e25cf4bbdb.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-sienna/ios_carousel/64af92572796ea18f7aaf65b8ee03f88.jpg'
                  ],
                  'ios_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-sienna/ios_main/64af92572796ea18f7aaf65b8ee03f88.jpg',
                  'ios_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-sienna/ios_thumb/64af92572796ea18f7aaf65b8ee03f88.jpg',
                  'website_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-sienna/website_carousel/af5e3965c84ef8f1e4485dee124b96ab.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-sienna/website_carousel/c3a5645afbc929f91f7150e25cf4bbdb.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-sienna/website_carousel/64af92572796ea18f7aaf65b8ee03f88.jpg'
                  ],
                  'website_hero': 'https://assets-0.bloomandwild.com/letterbox-main/the-sienna/website_hero/64af92572796ea18f7aaf65b8ee03f88.jpg',
                  'website_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-sienna/website_main/64af92572796ea18f7aaf65b8ee03f88.jpg',
                  'website_medium': 'https://assets-0.bloomandwild.com/letterbox-main/the-sienna/website_medium/64af92572796ea18f7aaf65b8ee03f88.jpg',
                  'website_small': 'https://assets-0.bloomandwild.com/letterbox-main/the-sienna/website_small/64af92572796ea18f7aaf65b8ee03f88.jpg',
                  'ios_upsell': '',
                  'android_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-sienna/android_carousel/af5e3965c84ef8f1e4485dee124b96ab.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-sienna/android_carousel/c3a5645afbc929f91f7150e25cf4bbdb.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-sienna/android_carousel/64af92572796ea18f7aaf65b8ee03f88.jpg'
                  ],
                  'android_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-sienna/android_main/64af92572796ea18f7aaf65b8ee03f88.jpg',
                  'android_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-sienna/android_thumb/64af92572796ea18f7aaf65b8ee03f88.jpg',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'image_urls_x2': {
                  'ios_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-sienna/ios_carousel/af5e3965c84ef8f1e4485dee124b96ab_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-sienna/ios_carousel/c3a5645afbc929f91f7150e25cf4bbdb_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-sienna/ios_carousel/64af92572796ea18f7aaf65b8ee03f88_x2.jpg'
                  ],
                  'ios_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-sienna/ios_main/64af92572796ea18f7aaf65b8ee03f88_x2.jpg',
                  'ios_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-sienna/ios_thumb/64af92572796ea18f7aaf65b8ee03f88_x2.jpg',
                  'website_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-sienna/website_carousel/af5e3965c84ef8f1e4485dee124b96ab_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-sienna/website_carousel/c3a5645afbc929f91f7150e25cf4bbdb_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-sienna/website_carousel/64af92572796ea18f7aaf65b8ee03f88_x2.jpg'
                  ],
                  'website_hero': 'https://assets-0.bloomandwild.com/letterbox-main/the-sienna/website_hero/64af92572796ea18f7aaf65b8ee03f88_x2.jpg',
                  'website_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-sienna/website_main/64af92572796ea18f7aaf65b8ee03f88_x2.jpg',
                  'website_medium': 'https://assets-0.bloomandwild.com/letterbox-main/the-sienna/website_medium/64af92572796ea18f7aaf65b8ee03f88_x2.jpg',
                  'website_small': 'https://assets-0.bloomandwild.com/letterbox-main/the-sienna/website_small/64af92572796ea18f7aaf65b8ee03f88_x2.jpg',
                  'ios_upsell': '',
                  'android_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-sienna/android_carousel/af5e3965c84ef8f1e4485dee124b96ab_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-sienna/android_carousel/c3a5645afbc929f91f7150e25cf4bbdb_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-sienna/android_carousel/64af92572796ea18f7aaf65b8ee03f88_x2.jpg'
                  ],
                  'android_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-sienna/android_main/64af92572796ea18f7aaf65b8ee03f88_x2.jpg',
                  'android_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-sienna/android_thumb/64af92572796ea18f7aaf65b8ee03f88_x2.jpg',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'badge': null,
                'unboxing_video_id': null,
                'arrangement_video_id': null,
                'tags': [
                  'Autumnal Flowers',
                  'Letterbox Flowers',
                  'next day delivery',
                  'last minute',
                  'birthday',
                  'present',
                  'flower gift'
                ]
              },
              'in_stock': true,
              'next_available': '2016-02-02',
              'pricings': [
                {
                  'id': 483,
                  'sku_id': 55,
                  'quantity': 1,
                  'amount': '15.00',
                  'order_type': 'Subscription',
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 482,
                  'sku_id': 55,
                  'quantity': 3,
                  'amount': '55.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 481,
                  'sku_id': 55,
                  'quantity': 6,
                  'amount': '100.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 480,
                  'sku_id': 55,
                  'quantity': 12,
                  'amount': '195.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 479,
                  'sku_id': 55,
                  'quantity': 26,
                  'amount': '390.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 478,
                  'sku_id': 55,
                  'quantity': 52,
                  'amount': '795.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 477,
                  'sku_id': 55,
                  'quantity': 1,
                  'amount': '26.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                }
              ]
            },
            {
              'id': 41,
              'name': 'The Sofia',
              'collection_id': 1,
              'default_bouquet_id': 163,
              'description': null,
              'slug': 'the-sofia',
              'is_addon': false,
              'finlays_display_name': 'The Sofia',
              'weight': 0.25,
              'single_only': false,
              'bundle_only': false,
              'collection': null,
              'default_bouquet': {
                'id': 163,
                'name': 'The Sofia',
                'description': 'This fun, fresh cocktail of blooms is bursting with liatris, alstroemeria, lisianthus and lilies. The perfect gift for the life and soul of the party.\r\n\r\nDeliver a dose of The Sofia through their door, and make every day a fiesta.',
                'instructions': 'Just like us, flowers need a bit of TLC to be at their best. Add flower food to your favourite vase and fill with clean water. Trim each stem at a 45 degree angle and repeat every couple of days to keep your bouquet blooming. \r\nIntroducing The Sofia, a colourful cocktail of blooms, freshly-cut and packaged especially for you. We send some blooms in bud so that they arrive in the best possible condition, and you can enjoy them in full flower for longer.\r\nYour blooms will look beautiful however you arrange them, but if you’re looking for a little inspiration, head to bit.ly/thesofia to see our simple step-by-step video tutorial.\r\nNow you’ve styled your blooms, show them off! Share a snap of  your #LetterboxFlowers with us on Instagram @bloomandwild and and our favourite photo of the month will win a 3 wick Neom candle and 3 months of letterbox flowers.   \r\nGet in touch on hello@bloomandwild.com or 020 7352 9499',
                'collection_id': 1,
                'weekly_bouquet': false,
                'starting_on': '2016-01-08',
                'ending_on': '2016-07-31',
                'appearing_from': '2016-01-08T17:00:00.000+00:00',
                'appearing_to': '2016-07-31T15:30:00.000+01:00',
                'slug': 'the-sofia',
                'lily_free': false,
                'visible': true,
                'long_description': '>\'That every day should be a fiesta seemed to me a marvellous discovery”\r\n- Ernest Hemingway\r\n\r\nWe\'ve taken blazing star liatris, added a splash of purple and white alstroemeria and mixed with lisianthus and bold white lilies for a fun, fresh cocktail of blooms is bursting with party spirit.\r\n\r\nDeliver a dose of The Sofia through their door, and make every day a fiesta.',
                'eighteen_plus': false,
                'substitute_bouquet_id': 170,
                'limited_edition': false,
                'supplier_id': 1,
                'contents': '* 3 White Lily\n* 3 Purple Lisianthus\n* 3 Purple Alstroemeria\n* 3 White Alstroemeria\n* 5 Liatris',
                'image_urls': {
                  'ios_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-main/the-sofia/ios_carousel/cd3b4cfbf2268f1c0b5bada6f9378d4f.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-sofia/ios_carousel/e38afce2efa31ab5f66bd8cc1d225910.jpg',
                    'https://assets-0.bloomandwild.com/addon-carousel/the-sofia/ios_carousel/7a08224e1a3274fe5a04b1eb7e75e8c8.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-sofia/ios_carousel/93d9c6d9f726eff8051a1c97f8c077c2.jpg'
                  ],
                  'ios_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-sofia/ios_main/cd3b4cfbf2268f1c0b5bada6f9378d4f.jpg',
                  'ios_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-sofia/ios_thumb/cd3b4cfbf2268f1c0b5bada6f9378d4f.jpg',
                  'website_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-main/the-sofia/website_carousel/cd3b4cfbf2268f1c0b5bada6f9378d4f.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-sofia/website_carousel/e38afce2efa31ab5f66bd8cc1d225910.jpg',
                    'https://assets-0.bloomandwild.com/addon-carousel/the-sofia/website_carousel/7a08224e1a3274fe5a04b1eb7e75e8c8.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-sofia/website_carousel/93d9c6d9f726eff8051a1c97f8c077c2.jpg'
                  ],
                  'website_hero': 'https://assets-0.bloomandwild.com/letterbox-main/the-sofia/website_hero/cd3b4cfbf2268f1c0b5bada6f9378d4f.jpg',
                  'website_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-sofia/website_main/cd3b4cfbf2268f1c0b5bada6f9378d4f.jpg',
                  'website_medium': 'https://assets-0.bloomandwild.com/letterbox-main/the-sofia/website_medium/cd3b4cfbf2268f1c0b5bada6f9378d4f.jpg',
                  'website_small': 'https://assets-0.bloomandwild.com/letterbox-main/the-sofia/website_small/cd3b4cfbf2268f1c0b5bada6f9378d4f.jpg',
                  'ios_upsell': '',
                  'android_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-main/the-sofia/android_carousel/cd3b4cfbf2268f1c0b5bada6f9378d4f.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-sofia/android_carousel/e38afce2efa31ab5f66bd8cc1d225910.jpg',
                    'https://assets-0.bloomandwild.com/addon-carousel/the-sofia/android_carousel/7a08224e1a3274fe5a04b1eb7e75e8c8.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-sofia/android_carousel/93d9c6d9f726eff8051a1c97f8c077c2.jpg'
                  ],
                  'android_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-sofia/android_main/cd3b4cfbf2268f1c0b5bada6f9378d4f.jpg',
                  'android_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-sofia/android_thumb/cd3b4cfbf2268f1c0b5bada6f9378d4f.jpg',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'image_urls_x2': {
                  'ios_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-main/the-sofia/ios_carousel/cd3b4cfbf2268f1c0b5bada6f9378d4f_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-sofia/ios_carousel/e38afce2efa31ab5f66bd8cc1d225910_x2.jpg',
                    'https://assets-0.bloomandwild.com/addon-carousel/the-sofia/ios_carousel/7a08224e1a3274fe5a04b1eb7e75e8c8_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-sofia/ios_carousel/93d9c6d9f726eff8051a1c97f8c077c2_x2.jpg'
                  ],
                  'ios_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-sofia/ios_main/cd3b4cfbf2268f1c0b5bada6f9378d4f_x2.jpg',
                  'ios_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-sofia/ios_thumb/cd3b4cfbf2268f1c0b5bada6f9378d4f_x2.jpg',
                  'website_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-main/the-sofia/website_carousel/cd3b4cfbf2268f1c0b5bada6f9378d4f_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-sofia/website_carousel/e38afce2efa31ab5f66bd8cc1d225910_x2.jpg',
                    'https://assets-0.bloomandwild.com/addon-carousel/the-sofia/website_carousel/7a08224e1a3274fe5a04b1eb7e75e8c8_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-sofia/website_carousel/93d9c6d9f726eff8051a1c97f8c077c2_x2.jpg'
                  ],
                  'website_hero': 'https://assets-0.bloomandwild.com/letterbox-main/the-sofia/website_hero/cd3b4cfbf2268f1c0b5bada6f9378d4f_x2.jpg',
                  'website_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-sofia/website_main/cd3b4cfbf2268f1c0b5bada6f9378d4f_x2.jpg',
                  'website_medium': 'https://assets-0.bloomandwild.com/letterbox-main/the-sofia/website_medium/cd3b4cfbf2268f1c0b5bada6f9378d4f_x2.jpg',
                  'website_small': 'https://assets-0.bloomandwild.com/letterbox-main/the-sofia/website_small/cd3b4cfbf2268f1c0b5bada6f9378d4f_x2.jpg',
                  'ios_upsell': '',
                  'android_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-main/the-sofia/android_carousel/cd3b4cfbf2268f1c0b5bada6f9378d4f_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-sofia/android_carousel/e38afce2efa31ab5f66bd8cc1d225910_x2.jpg',
                    'https://assets-0.bloomandwild.com/addon-carousel/the-sofia/android_carousel/7a08224e1a3274fe5a04b1eb7e75e8c8_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-sofia/android_carousel/93d9c6d9f726eff8051a1c97f8c077c2_x2.jpg'
                  ],
                  'android_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-sofia/android_main/cd3b4cfbf2268f1c0b5bada6f9378d4f_x2.jpg',
                  'android_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-sofia/android_thumb/cd3b4cfbf2268f1c0b5bada6f9378d4f_x2.jpg',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'badge': null,
                'unboxing_video_id': null,
                'arrangement_video_id': 'EbXwsCseFcs',
                'tags': [
                  'Purple alstroemeria',
                  'White Lilies',
                  'letterbox flowers',
                  'next-day delivery',
                  'flower gift'
                ]
              },
              'in_stock': true,
              'next_available': '2016-02-02',
              'pricings': [
                {
                  'id': 287,
                  'sku_id': 41,
                  'quantity': 1,
                  'amount': '24.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 286,
                  'sku_id': 41,
                  'quantity': 52,
                  'amount': '795.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 285,
                  'sku_id': 41,
                  'quantity': 26,
                  'amount': '390.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 284,
                  'sku_id': 41,
                  'quantity': 12,
                  'amount': '195.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 283,
                  'sku_id': 41,
                  'quantity': 6,
                  'amount': '100.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 282,
                  'sku_id': 41,
                  'quantity': 3,
                  'amount': '50.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 281,
                  'sku_id': 41,
                  'quantity': 1,
                  'amount': '15.00',
                  'order_type': 'Subscription',
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                }
              ]
            },
            {
              'id': 51,
              'name': 'The Lizzie',
              'collection_id': 1,
              'default_bouquet_id': 173,
              'description': null,
              'slug': 'the-lizzie',
              'is_addon': false,
              'finlays_display_name': 'The Lizzie',
              'weight': 0.3,
              'single_only': false,
              'bundle_only': false,
              'collection': null,
              'default_bouquet': {
                'id': 173,
                'name': 'The Lizzie',
                'description': 'A delicately-hued bouquet of roses, alstroemeria and fragrant eucalyptus, inspired by \'Rose Quartz\', Pantone\'s Colour of the Year for 2016.',
                'instructions': 'Just like us, flowers need a bit of TLC to be at their best. Add flower food to your favourite vase and fill with clean water. Trim each stem at a 45 degree angle and repeat every couple of days to keep your bouquet blooming. \r\nIntroducing The Lizzie, a bouquet of delicate pinks, freshly-cut and packaged especially for you. We send some blooms in bud so that they arrive in the best possible condition, and you can enjoy them in full flower for longer.\r\nYour blooms will look beautiful however you arrange them, but \r\nNow you’ve styled your blooms, show them off! Share a snap of  your #LetterboxFlowers with us on Instagram @bloomandwild and and our favourite photo of the month will win a 3 wick Neom candle and 3 months of letterbox flowers.\r\nGet in touch on hello@bloomandwild.com or 020 7352 9499',
                'collection_id': 1,
                'weekly_bouquet': false,
                'starting_on': '2015-08-04',
                'ending_on': '2016-12-31',
                'appearing_from': '2015-08-03T15:30:00.000+01:00',
                'appearing_to': '2016-12-31T16:30:00.000+00:00',
                'slug': 'the-lizzie',
                'lily_free': true,
                'visible': true,
                'long_description': 'Inspired by \'Rose Quartz\' - Pantone\'s Colour of the Year - We\'ve given one of our most popular bouquets a makeover for 2016. \r\nBlush roses paired with cream lisianthus, pale pink alstroemerias and fragrant eucalyptus gives this favourite bouquet a fresh new look, that will be loved by fashionistas and design fans alike. \r\n\r\nWe check the quality of each bloom by eye before it is carefully packed by hand, and add protective netting to delicate blooms when necessary, to ensure that your gift will arrive in perfect condition, always.',
                'eighteen_plus': false,
                'substitute_bouquet_id': 163,
                'limited_edition': false,
                'supplier_id': 1,
                'contents': '* 3 Bella Rose\n* 5 Cream Lisianthus\n* 3 Eucalyptus\n* 3 Pale Pink Alstroemeria \n* 3 Labelle Rose',
                'image_urls': {
                  'ios_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-lizzie/ios_carousel/b6a17a776b4711744c092715e982a4bc.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-lizzie/ios_carousel/d4034e6d0183b7d4b71131225c3e499e.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-lizzie/ios_carousel/0640092a6390f87085edc5c630d151ce.jpg'
                  ],
                  'ios_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-lizzie/ios_main/0640092a6390f87085edc5c630d151ce.jpg',
                  'ios_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-lizzie/ios_thumb/0640092a6390f87085edc5c630d151ce.jpg',
                  'website_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-lizzie/website_carousel/b6a17a776b4711744c092715e982a4bc.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-lizzie/website_carousel/d4034e6d0183b7d4b71131225c3e499e.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-lizzie/website_carousel/0640092a6390f87085edc5c630d151ce.jpg'
                  ],
                  'website_hero': 'https://assets-0.bloomandwild.com/letterbox-main/the-lizzie/website_hero/0640092a6390f87085edc5c630d151ce.jpg',
                  'website_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-lizzie/website_main/0640092a6390f87085edc5c630d151ce.jpg',
                  'website_medium': 'https://assets-0.bloomandwild.com/letterbox-main/the-lizzie/website_medium/0640092a6390f87085edc5c630d151ce.jpg',
                  'website_small': 'https://assets-0.bloomandwild.com/letterbox-main/the-lizzie/website_small/0640092a6390f87085edc5c630d151ce.jpg',
                  'ios_upsell': '',
                  'android_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-lizzie/android_carousel/b6a17a776b4711744c092715e982a4bc.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-lizzie/android_carousel/d4034e6d0183b7d4b71131225c3e499e.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-lizzie/android_carousel/0640092a6390f87085edc5c630d151ce.jpg'
                  ],
                  'android_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-lizzie/android_main/0640092a6390f87085edc5c630d151ce.jpg',
                  'android_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-lizzie/android_thumb/0640092a6390f87085edc5c630d151ce.jpg',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'image_urls_x2': {
                  'ios_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-lizzie/ios_carousel/b6a17a776b4711744c092715e982a4bc_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-lizzie/ios_carousel/d4034e6d0183b7d4b71131225c3e499e_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-lizzie/ios_carousel/0640092a6390f87085edc5c630d151ce_x2.jpg'
                  ],
                  'ios_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-lizzie/ios_main/0640092a6390f87085edc5c630d151ce_x2.jpg',
                  'ios_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-lizzie/ios_thumb/0640092a6390f87085edc5c630d151ce_x2.jpg',
                  'website_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-lizzie/website_carousel/b6a17a776b4711744c092715e982a4bc_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-lizzie/website_carousel/d4034e6d0183b7d4b71131225c3e499e_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-lizzie/website_carousel/0640092a6390f87085edc5c630d151ce_x2.jpg'
                  ],
                  'website_hero': 'https://assets-0.bloomandwild.com/letterbox-main/the-lizzie/website_hero/0640092a6390f87085edc5c630d151ce_x2.jpg',
                  'website_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-lizzie/website_main/0640092a6390f87085edc5c630d151ce_x2.jpg',
                  'website_medium': 'https://assets-0.bloomandwild.com/letterbox-main/the-lizzie/website_medium/0640092a6390f87085edc5c630d151ce_x2.jpg',
                  'website_small': 'https://assets-0.bloomandwild.com/letterbox-main/the-lizzie/website_small/0640092a6390f87085edc5c630d151ce_x2.jpg',
                  'ios_upsell': '',
                  'android_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-lizzie/android_carousel/b6a17a776b4711744c092715e982a4bc_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-lizzie/android_carousel/d4034e6d0183b7d4b71131225c3e499e_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-lizzie/android_carousel/0640092a6390f87085edc5c630d151ce_x2.jpg'
                  ],
                  'android_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-lizzie/android_main/0640092a6390f87085edc5c630d151ce_x2.jpg',
                  'android_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-lizzie/android_thumb/0640092a6390f87085edc5c630d151ce_x2.jpg',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'badge': null,
                'unboxing_video_id': null,
                'arrangement_video_id': null,
                'tags': [
                  'Pink Roses',
                  'letterbox flowers',
                  'next-day delivery',
                  'last minute',
                  'flower',
                  'gift'
                ]
              },
              'in_stock': true,
              'next_available': '2016-02-02',
              'pricings': [
                {
                  'id': 422,
                  'sku_id': 51,
                  'quantity': 1,
                  'amount': '26.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 421,
                  'sku_id': 51,
                  'quantity': 52,
                  'amount': '795.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 420,
                  'sku_id': 51,
                  'quantity': 26,
                  'amount': '390.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 419,
                  'sku_id': 51,
                  'quantity': 12,
                  'amount': '195.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 418,
                  'sku_id': 51,
                  'quantity': 6,
                  'amount': '100.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 417,
                  'sku_id': 51,
                  'quantity': 3,
                  'amount': '55.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 416,
                  'sku_id': 51,
                  'quantity': 1,
                  'amount': '15.00',
                  'order_type': 'Subscription',
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                }
              ]
            },
            {
              'id': 62,
              'name': 'The Isla',
              'collection_id': 1,
              'default_bouquet_id': 238,
              'description': null,
              'slug': 'the-isla',
              'is_addon': false,
              'finlays_display_name': 'LB57',
              'weight': 0.35,
              'single_only': false,
              'bundle_only': false,
              'collection': null,
              'default_bouquet': {
                'id': 238,
                'name': 'The Isla',
                'description': 'The Isla is a fun, fresh bouquet of blooms featuring a variety of alstroemeria and soft peach spray carnations.',
                'instructions': 'Just like us, flowers need a bit of TLC to be at their best. Add flower food to your favourite vase and fill with clean water. Trim each stem at a 45 degree angle and repeat every couple of days to keep your bouquet blooming. \r\nIntroducing The Isla, a fun, fresh bouquet of alstroemeria, spray carnations and waxflower. We send our alstroemeria in bud to protect the delicate petals. Just pop in water and they will begin to bloom within 24 hours, and last for many days. \r\nTo arrange your blooms, trim your alstroemeria to different heights and position in the vase by alternating colours before interspersing the spray carnations and waxflower throughout for a wildflower feel. \r\nNow you’ve styled your blooms, show them off! Share a snap of your #LetterboxFlowers with us on Instagram @bloomandwild and our favourite of the month will win a 3 wick Neom candle and 3 months of letterbox flowers. \r\nGet in touch on hello@bloomandwild.com or 020 7352 9499',
                'collection_id': 1,
                'weekly_bouquet': false,
                'starting_on': '2016-01-02',
                'ending_on': '2016-12-31',
                'appearing_from': '2016-01-01T15:30:00.000+00:00',
                'appearing_to': '2016-12-31T15:30:00.000+00:00',
                'slug': 'the-isla',
                'lily_free': true,
                'visible': true,
                'long_description': 'The Isla is a fun, fresh bouquet of blooms featuring a variety of alstroemeria and soft peach spray carnations. \r\n\r\nThe addition of waxflower gives the bouquet a wildflower feel, while the peach tones of the spray carnations and the variegated alstroemeria reflect this season\'s rose gold trend. \r\n\r\nTraditionally alstroemeria symbolise friendship, making this bright bouquet the perfect gift for friends old and new.',
                'eighteen_plus': false,
                'substitute_bouquet_id': null,
                'limited_edition': false,
                'supplier_id': 1,
                'contents': '* 6 Peach Spray Carnation\n* 6 Dancing Queen Alstroemaria\n* 3 White Waxflower\n* 5 White Alstroemeria',
                'image_urls': {
                  'ios_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-isla/ios_carousel/d707366526d6e25dabfa33cd4b3cfebb.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main-carousel/the-isla/ios_carousel/28fe4f3db7dd524501d36afc897f18c2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-isla/ios_carousel/6490843bc7eb82fc90dcfaacda39c010.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-isla/ios_carousel/c49ef4113da665d38cf4b1bb366a7f83.jpg'
                  ],
                  'ios_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-isla/ios_main/c49ef4113da665d38cf4b1bb366a7f83.jpg',
                  'ios_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-isla/ios_thumb/c49ef4113da665d38cf4b1bb366a7f83.jpg',
                  'website_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-isla/website_carousel/d707366526d6e25dabfa33cd4b3cfebb.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main-carousel/the-isla/website_carousel/28fe4f3db7dd524501d36afc897f18c2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-isla/website_carousel/6490843bc7eb82fc90dcfaacda39c010.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-isla/website_carousel/c49ef4113da665d38cf4b1bb366a7f83.jpg'
                  ],
                  'website_hero': 'https://assets-0.bloomandwild.com/letterbox-main/the-isla/website_hero/c49ef4113da665d38cf4b1bb366a7f83.jpg',
                  'website_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-isla/website_main/c49ef4113da665d38cf4b1bb366a7f83.jpg',
                  'website_medium': 'https://assets-0.bloomandwild.com/letterbox-main/the-isla/website_medium/c49ef4113da665d38cf4b1bb366a7f83.jpg',
                  'website_small': 'https://assets-0.bloomandwild.com/letterbox-main/the-isla/website_small/c49ef4113da665d38cf4b1bb366a7f83.jpg',
                  'ios_upsell': '',
                  'android_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-isla/android_carousel/d707366526d6e25dabfa33cd4b3cfebb.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main-carousel/the-isla/android_carousel/28fe4f3db7dd524501d36afc897f18c2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-isla/android_carousel/6490843bc7eb82fc90dcfaacda39c010.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-isla/android_carousel/c49ef4113da665d38cf4b1bb366a7f83.jpg'
                  ],
                  'android_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-isla/android_main/c49ef4113da665d38cf4b1bb366a7f83.jpg',
                  'android_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-isla/android_thumb/c49ef4113da665d38cf4b1bb366a7f83.jpg',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'image_urls_x2': {
                  'ios_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-isla/ios_carousel/d707366526d6e25dabfa33cd4b3cfebb_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main-carousel/the-isla/ios_carousel/28fe4f3db7dd524501d36afc897f18c2_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-isla/ios_carousel/6490843bc7eb82fc90dcfaacda39c010_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-isla/ios_carousel/c49ef4113da665d38cf4b1bb366a7f83_x2.jpg'
                  ],
                  'ios_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-isla/ios_main/c49ef4113da665d38cf4b1bb366a7f83_x2.jpg',
                  'ios_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-isla/ios_thumb/c49ef4113da665d38cf4b1bb366a7f83_x2.jpg',
                  'website_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-isla/website_carousel/d707366526d6e25dabfa33cd4b3cfebb_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main-carousel/the-isla/website_carousel/28fe4f3db7dd524501d36afc897f18c2_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-isla/website_carousel/6490843bc7eb82fc90dcfaacda39c010_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-isla/website_carousel/c49ef4113da665d38cf4b1bb366a7f83_x2.jpg'
                  ],
                  'website_hero': 'https://assets-0.bloomandwild.com/letterbox-main/the-isla/website_hero/c49ef4113da665d38cf4b1bb366a7f83_x2.jpg',
                  'website_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-isla/website_main/c49ef4113da665d38cf4b1bb366a7f83_x2.jpg',
                  'website_medium': 'https://assets-0.bloomandwild.com/letterbox-main/the-isla/website_medium/c49ef4113da665d38cf4b1bb366a7f83_x2.jpg',
                  'website_small': 'https://assets-0.bloomandwild.com/letterbox-main/the-isla/website_small/c49ef4113da665d38cf4b1bb366a7f83_x2.jpg',
                  'ios_upsell': '',
                  'android_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-isla/android_carousel/d707366526d6e25dabfa33cd4b3cfebb_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main-carousel/the-isla/android_carousel/28fe4f3db7dd524501d36afc897f18c2_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-isla/android_carousel/6490843bc7eb82fc90dcfaacda39c010_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-isla/android_carousel/c49ef4113da665d38cf4b1bb366a7f83_x2.jpg'
                  ],
                  'android_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-isla/android_main/c49ef4113da665d38cf4b1bb366a7f83_x2.jpg',
                  'android_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-isla/android_thumb/c49ef4113da665d38cf4b1bb366a7f83_x2.jpg',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'badge': null,
                'unboxing_video_id': null,
                'arrangement_video_id': null,
                'tags': [
                  'next-day delivery',
                  'yellow',
                  'letterbox flowers',
                  'flower',
                  'gift',
                  'last minute',
                  'birthday',
                  'anniversary',
                  'present'
                ]
              },
              'in_stock': true,
              'next_available': '2016-02-02',
              'pricings': [
                {
                  'id': 594,
                  'sku_id': 62,
                  'quantity': 1,
                  'amount': '15.00',
                  'order_type': 'Subscription',
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 593,
                  'sku_id': 62,
                  'quantity': 3,
                  'amount': '50.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 592,
                  'sku_id': 62,
                  'quantity': 6,
                  'amount': '100.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 591,
                  'sku_id': 62,
                  'quantity': 12,
                  'amount': '195.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 590,
                  'sku_id': 62,
                  'quantity': 26,
                  'amount': '415.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 589,
                  'sku_id': 62,
                  'quantity': 52,
                  'amount': '795.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 588,
                  'sku_id': 62,
                  'quantity': 1,
                  'amount': '20.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                }
              ]
            },
            {
              'id': 37,
              'name': 'The Eleanor',
              'collection_id': 1,
              'default_bouquet_id': 159,
              'description': null,
              'slug': 'the-eleanor',
              'is_addon': false,
              'finlays_display_name': null,
              'weight': 0.4,
              'single_only': false,
              'bundle_only': false,
              'collection': null,
              'default_bouquet': {
                'id': 159,
                'name': 'The Eleanor',
                'description': 'Get ready to fall head over heels for The Eleanor, a delicate blush bouquet featuring alstroemeria, vintage apple-tea carnations and soft peach lilies.',
                'instructions': 'Just like us, flowers need a bit of TLC to be at their best. Add flower food to your favourite vase and fill with clean water. Trim each stem at a 45 degree angle and repeat every couple of days to keep your bouquet blooming. \r\nIntroducing The Eleanor, a vintage blush bouquet, freshly-cut and packaged especially for you. We send some blooms in bud so that they arrive in the best possible condition, and you can enjoy them in full flower for longer.\r\nFirst position the lilies, crossing over the stems to give the bouquet structure. Slide in the ruscus and then the alstroemeria, alternating colours throughout. Finish with carnations, trimmed to different heights.\r\nNow you’ve styled your blooms, show them off! Share a snap of your #LetterboxFlowers with us on Instagram @bloomandwild and our favourite photo of the month will win a 3 wick Neom candle and 3 months of letterbox flowers. \r\nGet in touch on hello@bloomandwild.com or 020 7352 9499',
                'collection_id': 1,
                'weekly_bouquet': false,
                'starting_on': '2015-07-14',
                'ending_on': '2016-08-31',
                'appearing_from': '2015-07-13T15:30:00.000+01:00',
                'appearing_to': '2016-08-31T15:30:00.000+01:00',
                'slug': 'the-eleanor',
                'lily_free': false,
                'visible': true,
                'long_description': '>“Know your own happiness\' \r\n- Jane Austen, *Sense and Sensibility* \r\n\r\nGet ready to fall head over heels for The Eleanor, a delicate blush bouquet featuring alstroemeria, vintage apple-tea carnations and soft peach lilies. \r\n\r\nLovingly prepared by hand and delivered through the door in our unique Letterbox, this is a bouquet they can\'t help but fall for.',
                'eighteen_plus': false,
                'substitute_bouquet_id': null,
                'limited_edition': false,
                'supplier_id': 1,
                'contents': '* 3 Peach Alstroemeria\n* 3 White Alstroemeria\n* 7 Peach Carnation\n* 3 Peach Lily\n* 3 Ruscus',
                'image_urls': {
                  'ios_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-eleanor/ios_carousel/fb2ec30c0533838009e7d631d62d8a30.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-eleanor/ios_carousel/468b036f756ed6bbe51a3d3e615723da.jpg',
                    'https://assets-0.bloomandwild.com/addon-carousel/the-eleanor/ios_carousel/cdec7641bb4e3bfe8ab6435d5659f505.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-eleanor/ios_carousel/995f3ca5d9a71dbb7d005abd6bc210f0.jpg'
                  ],
                  'ios_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-eleanor/ios_main/995f3ca5d9a71dbb7d005abd6bc210f0.jpg',
                  'ios_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-eleanor/ios_thumb/995f3ca5d9a71dbb7d005abd6bc210f0.jpg',
                  'website_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-eleanor/website_carousel/ee3f95c918489023a9644ac4bc9bb36f.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-eleanor/website_carousel/468b036f756ed6bbe51a3d3e615723da.jpg',
                    'https://assets-0.bloomandwild.com/addon-carousel/the-eleanor/website_carousel/cdec7641bb4e3bfe8ab6435d5659f505.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-eleanor/website_carousel/995f3ca5d9a71dbb7d005abd6bc210f0.jpg'
                  ],
                  'website_hero': 'https://assets-0.bloomandwild.com/letterbox-main/the-eleanor/website_hero/995f3ca5d9a71dbb7d005abd6bc210f0.jpg',
                  'website_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-eleanor/website_main/995f3ca5d9a71dbb7d005abd6bc210f0.jpg',
                  'website_medium': 'https://assets-0.bloomandwild.com/letterbox-main/the-eleanor/website_medium/995f3ca5d9a71dbb7d005abd6bc210f0.jpg',
                  'website_small': 'https://assets-0.bloomandwild.com/letterbox-main/the-eleanor/website_small/995f3ca5d9a71dbb7d005abd6bc210f0.jpg',
                  'ios_upsell': '',
                  'android_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-eleanor/android_carousel/468b036f756ed6bbe51a3d3e615723da.jpg',
                    'https://assets-0.bloomandwild.com/addon-carousel/the-eleanor/android_carousel/cdec7641bb4e3bfe8ab6435d5659f505.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-eleanor/android_carousel/995f3ca5d9a71dbb7d005abd6bc210f0.jpg'
                  ],
                  'android_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-eleanor/android_main/995f3ca5d9a71dbb7d005abd6bc210f0.jpg',
                  'android_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-eleanor/android_thumb/995f3ca5d9a71dbb7d005abd6bc210f0.jpg',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'image_urls_x2': {
                  'ios_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-eleanor/ios_carousel/fb2ec30c0533838009e7d631d62d8a30_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-eleanor/ios_carousel/468b036f756ed6bbe51a3d3e615723da_x2.jpg',
                    'https://assets-0.bloomandwild.com/addon-carousel/the-eleanor/ios_carousel/cdec7641bb4e3bfe8ab6435d5659f505_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-eleanor/ios_carousel/995f3ca5d9a71dbb7d005abd6bc210f0_x2.jpg'
                  ],
                  'ios_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-eleanor/ios_main/995f3ca5d9a71dbb7d005abd6bc210f0_x2.jpg',
                  'ios_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-eleanor/ios_thumb/995f3ca5d9a71dbb7d005abd6bc210f0_x2.jpg',
                  'website_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-eleanor/website_carousel/ee3f95c918489023a9644ac4bc9bb36f_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-eleanor/website_carousel/468b036f756ed6bbe51a3d3e615723da_x2.jpg',
                    'https://assets-0.bloomandwild.com/addon-carousel/the-eleanor/website_carousel/cdec7641bb4e3bfe8ab6435d5659f505_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-eleanor/website_carousel/995f3ca5d9a71dbb7d005abd6bc210f0_x2.jpg'
                  ],
                  'website_hero': 'https://assets-0.bloomandwild.com/letterbox-main/the-eleanor/website_hero/995f3ca5d9a71dbb7d005abd6bc210f0_x2.jpg',
                  'website_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-eleanor/website_main/995f3ca5d9a71dbb7d005abd6bc210f0_x2.jpg',
                  'website_medium': 'https://assets-0.bloomandwild.com/letterbox-main/the-eleanor/website_medium/995f3ca5d9a71dbb7d005abd6bc210f0_x2.jpg',
                  'website_small': 'https://assets-0.bloomandwild.com/letterbox-main/the-eleanor/website_small/995f3ca5d9a71dbb7d005abd6bc210f0_x2.jpg',
                  'ios_upsell': '',
                  'android_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-eleanor/android_carousel/468b036f756ed6bbe51a3d3e615723da_x2.jpg',
                    'https://assets-0.bloomandwild.com/addon-carousel/the-eleanor/android_carousel/cdec7641bb4e3bfe8ab6435d5659f505_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-eleanor/android_carousel/995f3ca5d9a71dbb7d005abd6bc210f0_x2.jpg'
                  ],
                  'android_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-eleanor/android_main/995f3ca5d9a71dbb7d005abd6bc210f0_x2.jpg',
                  'android_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-eleanor/android_thumb/995f3ca5d9a71dbb7d005abd6bc210f0_x2.jpg',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'badge': null,
                'unboxing_video_id': 'aR81FMIvA0Y',
                'arrangement_video_id': 'eN08rutR9JA',
                'tags': [
                  'Peach Lilies',
                  'letterbox flowers',
                  'next-day delivery',
                  'last minute',
                  'flower gift'
                ]
              },
              'in_stock': true,
              'next_available': '2016-02-02',
              'pricings': [
                {
                  'id': 251,
                  'sku_id': 37,
                  'quantity': 1,
                  'amount': '15.00',
                  'order_type': 'Subscription',
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 250,
                  'sku_id': 37,
                  'quantity': 3,
                  'amount': '50.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 249,
                  'sku_id': 37,
                  'quantity': 6,
                  'amount': '100.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 248,
                  'sku_id': 37,
                  'quantity': 12,
                  'amount': '195.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 247,
                  'sku_id': 37,
                  'quantity': 26,
                  'amount': '390.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 246,
                  'sku_id': 37,
                  'quantity': 52,
                  'amount': '795.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 245,
                  'sku_id': 37,
                  'quantity': 1,
                  'amount': '22.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                }
              ]
            },
            {
              'id': 58,
              'name': 'The Coco',
              'collection_id': 1,
              'default_bouquet_id': 204,
              'description': '',
              'slug': 'the-coco',
              'is_addon': false,
              'finlays_display_name': 'The Coco',
              'weight': 0.4,
              'single_only': false,
              'bundle_only': false,
              'collection': null,
              'default_bouquet': {
                'id': 204,
                'name': 'The Coco',
                'description': 'With London Fashion Week in full swing, We\'ve created a limited edition bouquet inspired by the timeless elegance of Coco Chanel.\r\n\r\nWith delicate bella roses and pale pink gladioli the simple elegance of this arrangement will look stunning in any home.',
                'instructions': 'We hope that you enjoy The Coco, inspired by the First Lady of fashion, designed by our florist and prepared by hand for you.\r\nTo delight in your blooms for as long as possible, snip each stem at a 45 degree angle before adding to your chosen vase. Re-trim every few days and change the water regularly to keep your flowers at their best.\r\nThe roses are the centrepiece of this bouquet, so position these in your vase first.\r\nTrim the alstroemeria and limonium to different heights and arrange around the roses, for a varied and visually interesting display. Finally slide the gladioli into the back of the vase to add height.\r\nWe love to see your blooms, so don\'t forget to share your styling with us on instagram @bloomandwild with #TheCoco.',
                'collection_id': 1,
                'weekly_bouquet': false,
                'starting_on': '2015-09-21',
                'ending_on': '2015-09-26',
                'appearing_from': '2015-09-20T15:30:00.000+01:00',
                'appearing_to': '2015-09-25T16:30:00.000+01:00',
                'slug': 'the-coco',
                'lily_free': true,
                'visible': true,
                'long_description': '>\'Fashion fades, only style remains the same.\'\r\n*Coco Chanel*\r\n\r\nWith London Fashion Week in full swing, We\'ve created a limited edition bouquet inspired by the timeless elegance of one of fashion\'s most inimitable figures.\r\n\r\nWith delicate bella roses and pale pink gladioli the simple elegance of this arrangement will look stunning in any home.',
                'eighteen_plus': false,
                'substitute_bouquet_id': 173,
                'limited_edition': true,
                'supplier_id': 1,
                'contents': '* 3 Labelle Rose\n* 7 White Alstroemeria\n* 3 Gladiolus\n* 2 White Limonium',
                'image_urls': {
                  'ios_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-coco/ios_carousel/216a02439c0a4bcd3595f2ba8c688ffb.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-coco/ios_carousel/2d9bac5e02887ac9e9233913043e610a.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-coco/ios_carousel/1416d9e6ca7b0e959728a2bd07cdeb5e.jpg'
                  ],
                  'ios_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-coco/ios_main/1416d9e6ca7b0e959728a2bd07cdeb5e.jpg',
                  'ios_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-coco/ios_thumb/1416d9e6ca7b0e959728a2bd07cdeb5e.jpg',
                  'website_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-coco/website_carousel/216a02439c0a4bcd3595f2ba8c688ffb.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-coco/website_carousel/2d9bac5e02887ac9e9233913043e610a.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-coco/website_carousel/1416d9e6ca7b0e959728a2bd07cdeb5e.jpg'
                  ],
                  'website_hero': 'https://assets-0.bloomandwild.com/letterbox-main/the-coco/website_hero/1416d9e6ca7b0e959728a2bd07cdeb5e.jpg',
                  'website_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-coco/website_main/1416d9e6ca7b0e959728a2bd07cdeb5e.jpg',
                  'website_medium': 'https://assets-0.bloomandwild.com/letterbox-main/the-coco/website_medium/1416d9e6ca7b0e959728a2bd07cdeb5e.jpg',
                  'website_small': 'https://assets-0.bloomandwild.com/letterbox-main/the-coco/website_small/1416d9e6ca7b0e959728a2bd07cdeb5e.jpg',
                  'ios_upsell': '',
                  'android_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-coco/android_carousel/216a02439c0a4bcd3595f2ba8c688ffb.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-coco/android_carousel/2d9bac5e02887ac9e9233913043e610a.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-coco/android_carousel/1416d9e6ca7b0e959728a2bd07cdeb5e.jpg'
                  ],
                  'android_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-coco/android_main/1416d9e6ca7b0e959728a2bd07cdeb5e.jpg',
                  'android_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-coco/android_thumb/1416d9e6ca7b0e959728a2bd07cdeb5e.jpg',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'image_urls_x2': {
                  'ios_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-coco/ios_carousel/216a02439c0a4bcd3595f2ba8c688ffb_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-coco/ios_carousel/2d9bac5e02887ac9e9233913043e610a_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-coco/ios_carousel/1416d9e6ca7b0e959728a2bd07cdeb5e_x2.jpg'
                  ],
                  'ios_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-coco/ios_main/1416d9e6ca7b0e959728a2bd07cdeb5e_x2.jpg',
                  'ios_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-coco/ios_thumb/1416d9e6ca7b0e959728a2bd07cdeb5e_x2.jpg',
                  'website_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-coco/website_carousel/216a02439c0a4bcd3595f2ba8c688ffb_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-coco/website_carousel/2d9bac5e02887ac9e9233913043e610a_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-coco/website_carousel/1416d9e6ca7b0e959728a2bd07cdeb5e_x2.jpg'
                  ],
                  'website_hero': 'https://assets-0.bloomandwild.com/letterbox-main/the-coco/website_hero/1416d9e6ca7b0e959728a2bd07cdeb5e_x2.jpg',
                  'website_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-coco/website_main/1416d9e6ca7b0e959728a2bd07cdeb5e_x2.jpg',
                  'website_medium': 'https://assets-0.bloomandwild.com/letterbox-main/the-coco/website_medium/1416d9e6ca7b0e959728a2bd07cdeb5e_x2.jpg',
                  'website_small': 'https://assets-0.bloomandwild.com/letterbox-main/the-coco/website_small/1416d9e6ca7b0e959728a2bd07cdeb5e_x2.jpg',
                  'ios_upsell': '',
                  'android_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-coco/android_carousel/216a02439c0a4bcd3595f2ba8c688ffb_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-coco/android_carousel/2d9bac5e02887ac9e9233913043e610a_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-coco/android_carousel/1416d9e6ca7b0e959728a2bd07cdeb5e_x2.jpg'
                  ],
                  'android_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-coco/android_main/1416d9e6ca7b0e959728a2bd07cdeb5e_x2.jpg',
                  'android_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-coco/android_thumb/1416d9e6ca7b0e959728a2bd07cdeb5e_x2.jpg',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'badge': 'Limited Edition',
                'unboxing_video_id': null,
                'arrangement_video_id': null,
                'tags': []
              },
              'in_stock': false,
              'next_available': '2016-02-03',
              'pricings': [
                {
                  'id': 519,
                  'sku_id': 58,
                  'quantity': 1,
                  'amount': '15.00',
                  'order_type': 'Subscription',
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 518,
                  'sku_id': 58,
                  'quantity': 3,
                  'amount': '55.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 517,
                  'sku_id': 58,
                  'quantity': 6,
                  'amount': '100.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 516,
                  'sku_id': 58,
                  'quantity': 12,
                  'amount': '195.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 515,
                  'sku_id': 58,
                  'quantity': 26,
                  'amount': '415.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 514,
                  'sku_id': 58,
                  'quantity': 52,
                  'amount': '795.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 513,
                  'sku_id': 58,
                  'quantity': 1,
                  'amount': '26.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                }
              ]
            },
            {
              'id': 93,
              'name': 'The Catherine',
              'collection_id': 1,
              'default_bouquet_id': 269,
              'description': null,
              'slug': 'the-catherine-letterbox',
              'is_addon': false,
              'finlays_display_name': 'The Kat',
              'weight': 0.45,
              'single_only': false,
              'bundle_only': false,
              'collection': null,
              'default_bouquet': {
                'id': 269,
                'name': 'The Catherine',
                'description': 'This letterbox-friendly bouquet of deep pink calla lilies, blueberry roses, eryngium and waxflower captures the wild romance and beauty of the moors.\r\n\r\nCarefully prepared by hand in our signature Letterbox and delivered straight through their door, this statement bouquet is sure to win their heart.',
                'instructions': 'Just like us, flowers need a bit of TLC to be at their best. Add flower food to your favourite vase and fill with clean water. Trim each stem at a 45 degree angle and repeat every couple of days to keep your bouquet blooming. \r\nIntroducing The Catherine, a wildly romantic bouquet, freshly-cut and hand prepared especially for you. We send some blooms in bud so that they arrive in the best possible condition, and you can enjoy them in full flower for longer.\r\nTo arrange your blooms, we suggest positioning the roses and calla lilies first, crossing over the stems. Slide the alstroemeria into this grid and finally position the waxflower, eryngium and ruscus around the outside. \r\nNow you’ve styled your blooms, show them off! Share a snap of your #LetterboxFlowers with us on Instagram @bloomandwild and our favourite photo of the month will win a 3 wick Neom candle and 3 months of letterbox flowers. \r\nGet in touch on hello@bloomandwild.com or 020 7352 9499',
                'collection_id': 1,
                'weekly_bouquet': false,
                'starting_on': '2016-01-14',
                'ending_on': '2016-12-31',
                'appearing_from': '2016-01-15T17:00:00.000+00:00',
                'appearing_to': '2016-12-31T00:00:00.000+00:00',
                'slug': 'the-catherine-letterbox',
                'lily_free': true,
                'visible': true,
                'long_description': 'This beautiful bouquet of deep pink calla lilies, blueberry roses, eryngium and waxflower captures the wild romance and beauty of the moors.\r\n\r\nCarefully prepared by hand in our signature Letterbox and delivered straight through their door, this statement bouquet is sure to win their heart.',
                'eighteen_plus': false,
                'substitute_bouquet_id': 173,
                'limited_edition': false,
                'supplier_id': 1,
                'contents': '* 3 Pink Calla Lily\n* 5 Blueberry  Rose\n* 3 Pink Limonium\n* 3 White Alstroemaria\n* 2 Eryngium\n* 3 Pale Pink Alstroemeria \n* 1 Ruscus',
                'image_urls': {
                  'ios_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-catherine-letterbox/ios_carousel/af64141ae9cf78f1b298deef6fa17138.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-catherine-letterbox/ios_carousel/c9dc2a4b5db66f4b90d61a4b527984ab.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-catherine-letterbox/ios_carousel/09e9e28163ee6f089862857dee378c97.jpg'
                  ],
                  'ios_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-catherine-letterbox/ios_main/09e9e28163ee6f089862857dee378c97.jpg',
                  'ios_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-catherine-letterbox/ios_thumb/09e9e28163ee6f089862857dee378c97.jpg',
                  'website_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-catherine-letterbox/website_carousel/af64141ae9cf78f1b298deef6fa17138.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-catherine-letterbox/website_carousel/c9dc2a4b5db66f4b90d61a4b527984ab.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-catherine-letterbox/website_carousel/09e9e28163ee6f089862857dee378c97.jpg'
                  ],
                  'website_hero': 'https://assets-0.bloomandwild.com/letterbox-main/the-catherine-letterbox/website_hero/09e9e28163ee6f089862857dee378c97.jpg',
                  'website_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-catherine-letterbox/website_main/09e9e28163ee6f089862857dee378c97.jpg',
                  'website_medium': 'https://assets-0.bloomandwild.com/letterbox-main/the-catherine-letterbox/website_medium/09e9e28163ee6f089862857dee378c97.jpg',
                  'website_small': 'https://assets-0.bloomandwild.com/letterbox-main/the-catherine-letterbox/website_small/09e9e28163ee6f089862857dee378c97.jpg',
                  'ios_upsell': '',
                  'android_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-catherine-letterbox/android_carousel/af64141ae9cf78f1b298deef6fa17138.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-catherine-letterbox/android_carousel/c9dc2a4b5db66f4b90d61a4b527984ab.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-catherine-letterbox/android_carousel/09e9e28163ee6f089862857dee378c97.jpg'
                  ],
                  'android_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-catherine-letterbox/android_main/09e9e28163ee6f089862857dee378c97.jpg',
                  'android_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-catherine-letterbox/android_thumb/09e9e28163ee6f089862857dee378c97.jpg',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'image_urls_x2': {
                  'ios_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-catherine-letterbox/ios_carousel/af64141ae9cf78f1b298deef6fa17138_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-catherine-letterbox/ios_carousel/c9dc2a4b5db66f4b90d61a4b527984ab_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-catherine-letterbox/ios_carousel/09e9e28163ee6f089862857dee378c97_x2.jpg'
                  ],
                  'ios_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-catherine-letterbox/ios_main/09e9e28163ee6f089862857dee378c97_x2.jpg',
                  'ios_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-catherine-letterbox/ios_thumb/09e9e28163ee6f089862857dee378c97_x2.jpg',
                  'website_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-catherine-letterbox/website_carousel/af64141ae9cf78f1b298deef6fa17138_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-catherine-letterbox/website_carousel/c9dc2a4b5db66f4b90d61a4b527984ab_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-catherine-letterbox/website_carousel/09e9e28163ee6f089862857dee378c97_x2.jpg'
                  ],
                  'website_hero': 'https://assets-0.bloomandwild.com/letterbox-main/the-catherine-letterbox/website_hero/09e9e28163ee6f089862857dee378c97_x2.jpg',
                  'website_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-catherine-letterbox/website_main/09e9e28163ee6f089862857dee378c97_x2.jpg',
                  'website_medium': 'https://assets-0.bloomandwild.com/letterbox-main/the-catherine-letterbox/website_medium/09e9e28163ee6f089862857dee378c97_x2.jpg',
                  'website_small': 'https://assets-0.bloomandwild.com/letterbox-main/the-catherine-letterbox/website_small/09e9e28163ee6f089862857dee378c97_x2.jpg',
                  'ios_upsell': '',
                  'android_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-catherine-letterbox/android_carousel/af64141ae9cf78f1b298deef6fa17138_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-catherine-letterbox/android_carousel/c9dc2a4b5db66f4b90d61a4b527984ab_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-catherine-letterbox/android_carousel/09e9e28163ee6f089862857dee378c97_x2.jpg'
                  ],
                  'android_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-catherine-letterbox/android_main/09e9e28163ee6f089862857dee378c97_x2.jpg',
                  'android_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-catherine-letterbox/android_thumb/09e9e28163ee6f089862857dee378c97_x2.jpg',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'badge': null,
                'unboxing_video_id': null,
                'arrangement_video_id': null,
                'tags': [
                  'next-day delivery',
                  'letterbox flowers',
                  'last minute',
                  'flower',
                  'gift',
                  'blueberry roses',
                  'pink calla lilies'
                ]
              },
              'in_stock': true,
              'next_available': '2016-02-02',
              'pricings': [
                {
                  'id': 1163,
                  'sku_id': 93,
                  'quantity': 1,
                  'amount': '32.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 1162,
                  'sku_id': 93,
                  'quantity': 52,
                  'amount': '800.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 1161,
                  'sku_id': 93,
                  'quantity': 26,
                  'amount': '395.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 1160,
                  'sku_id': 93,
                  'quantity': 12,
                  'amount': '200.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 1159,
                  'sku_id': 93,
                  'quantity': 6,
                  'amount': '105.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 1158,
                  'sku_id': 93,
                  'quantity': 3,
                  'amount': '60.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 1157,
                  'sku_id': 93,
                  'quantity': 1,
                  'amount': '15.00',
                  'order_type': 'Subscription',
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                }
              ]
            },
            {
              'id': 60,
              'name': '3 Months of Flowers',
              'collection_id': 1,
              'default_bouquet_id': 206,
              'description': null,
              'slug': '3-months-of-flowers',
              'is_addon': false,
              'finlays_display_name': 'Monthly Flowers',
              'weight': 0.55,
              'single_only': false,
              'bundle_only': true,
              'collection': null,
              'default_bouquet': {
                'id': 206,
                'name': '3 Months of Flowers',
                'description': 'Give the gift of blooms again and again (and again!) with three months of flowers. Once a month for three months we\'ll choose a different fresh flower bouquet to deliver straight through their letterbox. Each bouquet is designed by our florist for a varied and beautiful present they will enjoy for weeks to come.',
                'instructions': null,
                'collection_id': 1,
                'weekly_bouquet': false,
                'starting_on': '2015-09-30',
                'ending_on': '2025-10-30',
                'appearing_from': '2015-09-29T15:30:00.000+01:00',
                'appearing_to': '2025-10-29T15:30:00.000+00:00',
                'slug': '3-months-of-flowers',
                'lily_free': true,
                'visible': true,
                'long_description': 'Give the gift of blooms again and again (and again!) with three months of flowers.\r\n\r\nOnce a month for three months we\'ll deliver a different fresh flower bouquet straight through their letterbox.\r\n\r\nEach bouquet is designed by our florist for a varied and beautiful present they will enjoy for weeks to come.',
                'eighteen_plus': false,
                'substitute_bouquet_id': null,
                'limited_edition': false,
                'supplier_id': 1,
                'contents': '',
                'image_urls': {
                  'ios_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-main-carousel/3-months-of-flowers/ios_carousel/84268bea972b31906e2ea26e4f20f929.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main-carousel/3-months-of-flowers/ios_carousel/0a032fbec8c716b9bbb7f08baaef8837.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/3-months-of-flowers/ios_carousel/3f99ce104de45216a37ea42db3865326.jpg'
                  ],
                  'ios_main': 'https://assets-0.bloomandwild.com/letterbox-main/3-months-of-flowers/ios_main/3f99ce104de45216a37ea42db3865326.jpg',
                  'ios_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/3-months-of-flowers/ios_thumb/3f99ce104de45216a37ea42db3865326.jpg',
                  'website_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-main-carousel/3-months-of-flowers/website_carousel/84268bea972b31906e2ea26e4f20f929.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main-carousel/3-months-of-flowers/website_carousel/0a032fbec8c716b9bbb7f08baaef8837.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/3-months-of-flowers/website_carousel/3f99ce104de45216a37ea42db3865326.jpg'
                  ],
                  'website_hero': 'https://assets-0.bloomandwild.com/letterbox-main/3-months-of-flowers/website_hero/3f99ce104de45216a37ea42db3865326.jpg',
                  'website_main': 'https://assets-0.bloomandwild.com/letterbox-main/3-months-of-flowers/website_main/3f99ce104de45216a37ea42db3865326.jpg',
                  'website_medium': 'https://assets-0.bloomandwild.com/letterbox-main/3-months-of-flowers/website_medium/3f99ce104de45216a37ea42db3865326.jpg',
                  'website_small': 'https://assets-0.bloomandwild.com/letterbox-main/3-months-of-flowers/website_small/3f99ce104de45216a37ea42db3865326.jpg',
                  'ios_upsell': '',
                  'android_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-main-carousel/3-months-of-flowers/android_carousel/84268bea972b31906e2ea26e4f20f929.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main-carousel/3-months-of-flowers/android_carousel/0a032fbec8c716b9bbb7f08baaef8837.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/3-months-of-flowers/android_carousel/3f99ce104de45216a37ea42db3865326.jpg'
                  ],
                  'android_main': 'https://assets-0.bloomandwild.com/letterbox-main/3-months-of-flowers/android_main/3f99ce104de45216a37ea42db3865326.jpg',
                  'android_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/3-months-of-flowers/android_thumb/3f99ce104de45216a37ea42db3865326.jpg',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'image_urls_x2': {
                  'ios_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-main-carousel/3-months-of-flowers/ios_carousel/84268bea972b31906e2ea26e4f20f929_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main-carousel/3-months-of-flowers/ios_carousel/0a032fbec8c716b9bbb7f08baaef8837_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/3-months-of-flowers/ios_carousel/3f99ce104de45216a37ea42db3865326_x2.jpg'
                  ],
                  'ios_main': 'https://assets-0.bloomandwild.com/letterbox-main/3-months-of-flowers/ios_main/3f99ce104de45216a37ea42db3865326_x2.jpg',
                  'ios_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/3-months-of-flowers/ios_thumb/3f99ce104de45216a37ea42db3865326_x2.jpg',
                  'website_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-main-carousel/3-months-of-flowers/website_carousel/84268bea972b31906e2ea26e4f20f929_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main-carousel/3-months-of-flowers/website_carousel/0a032fbec8c716b9bbb7f08baaef8837_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/3-months-of-flowers/website_carousel/3f99ce104de45216a37ea42db3865326_x2.jpg'
                  ],
                  'website_hero': 'https://assets-0.bloomandwild.com/letterbox-main/3-months-of-flowers/website_hero/3f99ce104de45216a37ea42db3865326_x2.jpg',
                  'website_main': 'https://assets-0.bloomandwild.com/letterbox-main/3-months-of-flowers/website_main/3f99ce104de45216a37ea42db3865326_x2.jpg',
                  'website_medium': 'https://assets-0.bloomandwild.com/letterbox-main/3-months-of-flowers/website_medium/3f99ce104de45216a37ea42db3865326_x2.jpg',
                  'website_small': 'https://assets-0.bloomandwild.com/letterbox-main/3-months-of-flowers/website_small/3f99ce104de45216a37ea42db3865326_x2.jpg',
                  'ios_upsell': '',
                  'android_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-main-carousel/3-months-of-flowers/android_carousel/84268bea972b31906e2ea26e4f20f929_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main-carousel/3-months-of-flowers/android_carousel/0a032fbec8c716b9bbb7f08baaef8837_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/3-months-of-flowers/android_carousel/3f99ce104de45216a37ea42db3865326_x2.jpg'
                  ],
                  'android_main': 'https://assets-0.bloomandwild.com/letterbox-main/3-months-of-flowers/android_main/3f99ce104de45216a37ea42db3865326_x2.jpg',
                  'android_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/3-months-of-flowers/android_thumb/3f99ce104de45216a37ea42db3865326_x2.jpg',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'badge': null,
                'unboxing_video_id': null,
                'arrangement_video_id': null,
                'tags': [
                  '3 Months of Flowers',
                  'Letterbox Flowers',
                  'Last Minute',
                  'Birthday',
                  'Anniversary',
                  'Flower Delivery',
                  'Present',
                  'Flower',
                  'Gift'
                ]
              },
              'in_stock': true,
              'next_available': '2016-02-02',
              'pricings': [
                {
                  'id': 553,
                  'sku_id': 60,
                  'quantity': 1,
                  'amount': '50.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 542,
                  'sku_id': 60,
                  'quantity': 3,
                  'amount': '50.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                }
              ]
            },
            {
              'id': 57,
              'name': 'The Juliet',
              'collection_id': 1,
              'default_bouquet_id': 203,
              'description': null,
              'slug': 'the-juliet',
              'is_addon': false,
              'finlays_display_name': 'The Juliet',
              'weight': 0.6,
              'single_only': false,
              'bundle_only': false,
              'collection': null,
              'default_bouquet': {
                'id': 203,
                'name': 'The Juliet',
                'description': 'A rose by any other name might smell as sweet, but this bouquet of twelve long-stemmed, deep red roses could only be The Juliet. Prepared by hand and delivered straight through their letterbox, this is a classic Valentine’s Day gift for any star-crossed lovers.',
                'instructions': 'Just like us, flowers need a bit of TLC to be at their best. Add flower food to your favourite vase and fill with clean water. Trim each stem at a 45 degree angle and repeat every couple of days to keep your bouquet blooming. \r\nIntroducing The Juliet, a timeless bouquet of a dozen red roses, freshly-cut and packaged especially for you. The head of each rose will gradually open out over time, revealing its beauty gradually over the coming days. \r\nYour blooms will look beautiful however you arrange them, but you might like to cut a few stems shorter to place at the front of the bouquet to created a graduated display.\r\nNow you’ve styled your blooms, show them off! Share a snap of your #LetterboxFlowers with us on Instagram @bloomandwild and our favourite photo of the month will win a 3 wick Neom candle and 3 months of letterbox flowers. \r\nGet in touch on hello@bloomandwild.com or 020 7352 9499',
                'collection_id': 1,
                'weekly_bouquet': false,
                'starting_on': '2015-10-13',
                'ending_on': '2016-12-31',
                'appearing_from': '2015-10-09T15:30:00.000+01:00',
                'appearing_to': '2016-12-30T16:30:00.000+00:00',
                'slug': 'the-juliet',
                'lily_free': true,
                'visible': true,
                'long_description': 'A rose by any other name might smell as sweet, but this bouquet of twelve long-stemmed, deep red roses could only be The Juliet.\r\nPrepared by hand and delivered straight through their letterbox, this is a classic Valentine’s Day gift for any star-crossed lovers.\r\n\r\nWe check the quality of each rose by eye, before carefully netting the head to protect every petal during transit to ensure that your flower gift will arrive in perfect condition, always.',
                'eighteen_plus': false,
                'substitute_bouquet_id': 173,
                'limited_edition': false,
                'supplier_id': 1,
                'contents': '* 12 Red Rose',
                'image_urls': {
                  'ios_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-juliet/ios_carousel/85498e8f7fcdd5a68f0630b883b450c6.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-juliet/ios_carousel/1fea85e4880db17eb0b8ed4d071ccc49.jpg',
                    'https://assets-0.bloomandwild.com/addon-carousel/the-juliet/ios_carousel/0c1017aab9c874e9ee92198eda7c9a2a.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-juliet/ios_carousel/08e3cde74bf0bf38078cdb276e5a0007.jpg'
                  ],
                  'ios_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-juliet/ios_main/08e3cde74bf0bf38078cdb276e5a0007.jpg',
                  'ios_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-juliet/ios_thumb/08e3cde74bf0bf38078cdb276e5a0007.jpg',
                  'website_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-juliet/website_carousel/85498e8f7fcdd5a68f0630b883b450c6.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-juliet/website_carousel/1fea85e4880db17eb0b8ed4d071ccc49.jpg',
                    'https://assets-0.bloomandwild.com/addon-carousel/the-juliet/website_carousel/0c1017aab9c874e9ee92198eda7c9a2a.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-juliet/website_carousel/08e3cde74bf0bf38078cdb276e5a0007.jpg'
                  ],
                  'website_hero': 'https://assets-0.bloomandwild.com/letterbox-main/the-juliet/website_hero/08e3cde74bf0bf38078cdb276e5a0007.jpg',
                  'website_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-juliet/website_main/08e3cde74bf0bf38078cdb276e5a0007.jpg',
                  'website_medium': 'https://assets-0.bloomandwild.com/letterbox-main/the-juliet/website_medium/08e3cde74bf0bf38078cdb276e5a0007.jpg',
                  'website_small': 'https://assets-0.bloomandwild.com/letterbox-main/the-juliet/website_small/08e3cde74bf0bf38078cdb276e5a0007.jpg',
                  'ios_upsell': '',
                  'android_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-juliet/android_carousel/85498e8f7fcdd5a68f0630b883b450c6.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-juliet/android_carousel/1fea85e4880db17eb0b8ed4d071ccc49.jpg',
                    'https://assets-0.bloomandwild.com/addon-carousel/the-juliet/android_carousel/0c1017aab9c874e9ee92198eda7c9a2a.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-juliet/android_carousel/08e3cde74bf0bf38078cdb276e5a0007.jpg'
                  ],
                  'android_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-juliet/android_main/08e3cde74bf0bf38078cdb276e5a0007.jpg',
                  'android_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-juliet/android_thumb/08e3cde74bf0bf38078cdb276e5a0007.jpg',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'image_urls_x2': {
                  'ios_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-juliet/ios_carousel/85498e8f7fcdd5a68f0630b883b450c6_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-juliet/ios_carousel/1fea85e4880db17eb0b8ed4d071ccc49_x2.jpg',
                    'https://assets-0.bloomandwild.com/addon-carousel/the-juliet/ios_carousel/0c1017aab9c874e9ee92198eda7c9a2a_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-juliet/ios_carousel/08e3cde74bf0bf38078cdb276e5a0007_x2.jpg'
                  ],
                  'ios_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-juliet/ios_main/08e3cde74bf0bf38078cdb276e5a0007_x2.jpg',
                  'ios_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-juliet/ios_thumb/08e3cde74bf0bf38078cdb276e5a0007_x2.jpg',
                  'website_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-juliet/website_carousel/85498e8f7fcdd5a68f0630b883b450c6_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-juliet/website_carousel/1fea85e4880db17eb0b8ed4d071ccc49_x2.jpg',
                    'https://assets-0.bloomandwild.com/addon-carousel/the-juliet/website_carousel/0c1017aab9c874e9ee92198eda7c9a2a_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-juliet/website_carousel/08e3cde74bf0bf38078cdb276e5a0007_x2.jpg'
                  ],
                  'website_hero': 'https://assets-0.bloomandwild.com/letterbox-main/the-juliet/website_hero/08e3cde74bf0bf38078cdb276e5a0007_x2.jpg',
                  'website_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-juliet/website_main/08e3cde74bf0bf38078cdb276e5a0007_x2.jpg',
                  'website_medium': 'https://assets-0.bloomandwild.com/letterbox-main/the-juliet/website_medium/08e3cde74bf0bf38078cdb276e5a0007_x2.jpg',
                  'website_small': 'https://assets-0.bloomandwild.com/letterbox-main/the-juliet/website_small/08e3cde74bf0bf38078cdb276e5a0007_x2.jpg',
                  'ios_upsell': '',
                  'android_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-juliet/android_carousel/85498e8f7fcdd5a68f0630b883b450c6_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-juliet/android_carousel/1fea85e4880db17eb0b8ed4d071ccc49_x2.jpg',
                    'https://assets-0.bloomandwild.com/addon-carousel/the-juliet/android_carousel/0c1017aab9c874e9ee92198eda7c9a2a_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-juliet/android_carousel/08e3cde74bf0bf38078cdb276e5a0007_x2.jpg'
                  ],
                  'android_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-juliet/android_main/08e3cde74bf0bf38078cdb276e5a0007_x2.jpg',
                  'android_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-juliet/android_thumb/08e3cde74bf0bf38078cdb276e5a0007_x2.jpg',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'badge': null,
                'unboxing_video_id': null,
                'arrangement_video_id': null,
                'tags': [
                  '12 Red Roses',
                  'Letterbox Flowers',
                  'Romantic',
                  'Flower Delivery',
                  'Gift'
                ]
              },
              'in_stock': true,
              'next_available': '2016-02-02',
              'pricings': [
                {
                  'id': 507,
                  'sku_id': 57,
                  'quantity': 1,
                  'amount': '15.00',
                  'order_type': 'Subscription',
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 506,
                  'sku_id': 57,
                  'quantity': 3,
                  'amount': '55.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 505,
                  'sku_id': 57,
                  'quantity': 6,
                  'amount': '100.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 504,
                  'sku_id': 57,
                  'quantity': 12,
                  'amount': '195.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 503,
                  'sku_id': 57,
                  'quantity': 26,
                  'amount': '390.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 502,
                  'sku_id': 57,
                  'quantity': 52,
                  'amount': '795.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 501,
                  'sku_id': 57,
                  'quantity': 1,
                  'amount': '28.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                }
              ]
            },
            {
              'id': 35,
              'name': 'The Penelope',
              'collection_id': 1,
              'default_bouquet_id': 137,
              'description': '',
              'slug': 'the-penelope',
              'is_addon': false,
              'finlays_display_name': '',
              'weight': 0.6,
              'single_only': false,
              'bundle_only': false,
              'collection': null,
              'default_bouquet': {
                'id': 137,
                'name': 'The Penelope',
                'description': 'All good things must come to an end, and sadly peony season is no exception. \r\n\r\nFor this week only, send these pillow-soft peonies straight through their letterbox, and celebrate this most beautiful of blooms.',
                'instructions': 'To enjoy these pillow-soft flowers for as long as possible, first snip the ends of each stem at a 45 degree angle before adding to your chosen vase. \r\nYou might like to trim some stems shorter and position these flowers at the front of your bouquet to give your arrangement a rounder shape. \r\nFinally, add the eucalyptus around the outside of the arrangement to create a collar-effect. The green leaves against the pink will help these stunning flowers shine. \r\nVisit us on instagram @bloomandwild for more peony pics, and share you own on Facebook, Twitter and Instagram using the hashtag #OhMyPeony. We can\'t wait to see them!',
                'collection_id': 1,
                'weekly_bouquet': false,
                'starting_on': '2015-06-23',
                'ending_on': '2015-06-27',
                'appearing_from': '2015-06-22T15:30:00.000+01:00',
                'appearing_to': '2015-06-26T16:30:00.000+01:00',
                'slug': 'the-penelope',
                'lily_free': true,
                'visible': true,
                'long_description': 'All good things must come to an end, and sadly peony season is no exception. \r\n\r\nBut We\'re going out with a bloom, with this limited edition arrangement of Sarah Bernhardt peonies and fragrant eucalyptus. \r\n\r\nFor this week only, send these pillow-soft peonies straight through their letterbox, and celebrate this most beautiful of blooms.',
                'eighteen_plus': false,
                'substitute_bouquet_id': 133,
                'limited_edition': false,
                'supplier_id': 1,
                'contents': '',
                'image_urls': {
                  'ios_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-main/the-penelope/iphone_carousel/af8ad2f55c28a4f29e65fa621fe21939.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-penelope/iphone_carousel/b159a8cec05b4f141e102a54ceadbcfd.jpg'
                  ],
                  'ios_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-penelope/iphone_main/f3713e09dff8ac49c505937b5799cccd.jpg',
                  'ios_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-penelope/iphone_thumb/6ba175a555831232eceba3854dfff4d3.jpg',
                  'website_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-main/the-penelope/website_carousel/bf19a842558629606ea584f440e96e8b.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-penelope/website_carousel/fe6006a8272f0e5599477a6aeba0d309.jpg'
                  ],
                  'website_hero': 'https://assets-0.bloomandwild.com/letterbox-main/the-penelope/website_hero/45736d6426e942cf000b6e6e5f3aa839.jpg',
                  'website_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-penelope/website_main/f8ba77d979053431a008e3cf76242246.jpg',
                  'website_medium': 'https://assets-0.bloomandwild.com/letterbox-main/the-penelope/website_medium/2f14d999119d941086b16b12438ef738.jpg',
                  'website_small': 'https://assets-0.bloomandwild.com/letterbox-main/the-penelope/website_small/00fa3f8c2d08d17bd60faae81954c946.jpg',
                  'ios_upsell': '',
                  'android_carousel': [],
                  'android_main': '',
                  'android_thumb': '',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'image_urls_x2': {
                  'ios_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-main/the-penelope/iphone_carousel/af8ad2f55c28a4f29e65fa621fe21939.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-penelope/iphone_carousel/b159a8cec05b4f141e102a54ceadbcfd.jpg'
                  ],
                  'ios_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-penelope/iphone_main/f3713e09dff8ac49c505937b5799cccd.jpg',
                  'ios_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-penelope/iphone_thumb/6ba175a555831232eceba3854dfff4d3.jpg',
                  'website_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-main/the-penelope/website_carousel/bf19a842558629606ea584f440e96e8b.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-penelope/website_carousel/fe6006a8272f0e5599477a6aeba0d309.jpg'
                  ],
                  'website_hero': 'https://assets-0.bloomandwild.com/letterbox-main/the-penelope/website_hero/45736d6426e942cf000b6e6e5f3aa839.jpg',
                  'website_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-penelope/website_main/f8ba77d979053431a008e3cf76242246.jpg',
                  'website_medium': 'https://assets-0.bloomandwild.com/letterbox-main/the-penelope/website_medium/2f14d999119d941086b16b12438ef738.jpg',
                  'website_small': 'https://assets-0.bloomandwild.com/letterbox-main/the-penelope/website_small/00fa3f8c2d08d17bd60faae81954c946.jpg',
                  'ios_upsell': '',
                  'android_carousel': [],
                  'android_main': '',
                  'android_thumb': '',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'badge': null,
                'unboxing_video_id': null,
                'arrangement_video_id': null,
                'tags': []
              },
              'in_stock': false,
              'next_available': '2016-02-03',
              'pricings': [
                {
                  'id': 241,
                  'sku_id': 35,
                  'quantity': 1,
                  'amount': '22.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 240,
                  'sku_id': 35,
                  'quantity': 52,
                  'amount': '795.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 239,
                  'sku_id': 35,
                  'quantity': 26,
                  'amount': '415.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 238,
                  'sku_id': 35,
                  'quantity': 12,
                  'amount': '195.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 237,
                  'sku_id': 35,
                  'quantity': 6,
                  'amount': '100.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 236,
                  'sku_id': 35,
                  'quantity': 3,
                  'amount': '50.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 235,
                  'sku_id': 35,
                  'quantity': 1,
                  'amount': '15.00',
                  'order_type': 'Subscription',
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                }
              ]
            },
            {
              'id': 39,
              'name': 'The Joni',
              'collection_id': 1,
              'default_bouquet_id': 161,
              'description': '',
              'slug': 'the-joni',
              'is_addon': false,
              'finlays_display_name': '',
              'weight': 0.6,
              'single_only': false,
              'bundle_only': false,
              'collection': null,
              'default_bouquet': {
                'id': 161,
                'name': 'The Joni',
                'description': 'Inspired by the laid-back vibes of festival season We\'ve created The Joni, a bohemian bouquet of pure white lilies with vintage La Belle roses.\r\nAvailable for this week only, and delivered through their letterbox, The Joni is the perfect way to share the love this Summer.',
                'instructions': 'We hope that you enjoy The Joni, a bohemian bouqet designed by our florist and prepared by hand for you.\r\nTo delight in your blooms for as long as possible, snip each stem at a 45 degree angle before adding to your chosen vase. Re-trim every few days and change the water regularly to keep your flowers at their best. \r\nThe lilies are the centrepiece of this bouquet, so position these in your vase first. Trim the roses and lisianthus to different heights and arrange around the lilies.\r\nFinally slide the limonium inbetween the blooms for a free spirit feel.\r\nVisit blog.bloomandwild.com for more flower arranging inspiration, and don\'t forget to share your styling with us on instagram @bloomandwild.',
                'collection_id': 1,
                'weekly_bouquet': false,
                'starting_on': '2015-07-21',
                'ending_on': '2015-07-25',
                'appearing_from': '2015-07-20T15:30:00.000+01:00',
                'appearing_to': '2015-07-24T16:30:00.000+01:00',
                'slug': 'the-joni',
                'lily_free': false,
                'visible': true,
                'long_description': '>\'We love our lovin\', but not like we love our freedom\'\r\n- Joni Mitchell \r\n\r\nWe\'re feeling the love this Summer, and inspired by the laid-back vibes of festival season We\'ve created The Joni. This bohemian bouquet combines pure white lilies with vintage La Belle roses and lilac lisianthus for a free spirit feel.\r\n\r\nAvailable for this week only, and delivered through their letterbox, The Joni is the perfect way to share the love this Summer.',
                'eighteen_plus': false,
                'substitute_bouquet_id': 131,
                'limited_edition': true,
                'supplier_id': 1,
                'contents': '* 5 Labelle Rose\n* 2 White Lily\n* 2 Lilac Limonium\n* 3 Lilac Lisianthus',
                'image_urls': {
                  'ios_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-main/the-joni/iphone_carousel/1e9d4c678a90f3a3475b8792e03741fc.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-open-box/the-joni/iphone_carousel/046c404b0fc0151371985d6bc54f8465.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-joni/iphone_carousel/7c652b6c8536b8ca8bfd283649aac4d8.jpg'
                  ],
                  'ios_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-joni/iphone_main/45f8f077db72a5df9d07e928e44e0e6d.jpg',
                  'ios_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-joni/iphone_thumb/6f1356fd173da4f56a5729a9069377ea.jpg',
                  'website_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-main/the-joni/website_carousel/5ae3f3e7acd93bffcd73eec81ffbacfb.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-open-box/the-joni/website_carousel/578e0320955faef8447dae6a4fddd361.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-joni/website_carousel/e688a24cf602d20901f7d4d8916ea51b.jpg'
                  ],
                  'website_hero': 'https://assets-0.bloomandwild.com/letterbox-main/the-joni/website_hero/9d89b73e32ee450e89aac5aa9e590844.jpg',
                  'website_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-joni/website_main/3252f07f55e797043e566cd966e106ce.jpg',
                  'website_medium': 'https://assets-0.bloomandwild.com/letterbox-main/the-joni/website_medium/8d339a1ba3a29a53efe3860e814028f9.jpg',
                  'website_small': 'https://assets-0.bloomandwild.com/letterbox-main/the-joni/website_small/3897acee1ab1024dfa553205c5a33484.jpg',
                  'ios_upsell': '',
                  'android_carousel': [],
                  'android_main': '',
                  'android_thumb': '',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'image_urls_x2': {
                  'ios_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-main/the-joni/iphone_carousel/1e9d4c678a90f3a3475b8792e03741fc.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-open-box/the-joni/iphone_carousel/046c404b0fc0151371985d6bc54f8465.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-joni/iphone_carousel/7c652b6c8536b8ca8bfd283649aac4d8.jpg'
                  ],
                  'ios_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-joni/iphone_main/45f8f077db72a5df9d07e928e44e0e6d.jpg',
                  'ios_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-joni/iphone_thumb/6f1356fd173da4f56a5729a9069377ea.jpg',
                  'website_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-main/the-joni/website_carousel/5ae3f3e7acd93bffcd73eec81ffbacfb.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-open-box/the-joni/website_carousel/578e0320955faef8447dae6a4fddd361.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-joni/website_carousel/e688a24cf602d20901f7d4d8916ea51b.jpg'
                  ],
                  'website_hero': 'https://assets-0.bloomandwild.com/letterbox-main/the-joni/website_hero/9d89b73e32ee450e89aac5aa9e590844.jpg',
                  'website_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-joni/website_main/3252f07f55e797043e566cd966e106ce.jpg',
                  'website_medium': 'https://assets-0.bloomandwild.com/letterbox-main/the-joni/website_medium/8d339a1ba3a29a53efe3860e814028f9.jpg',
                  'website_small': 'https://assets-0.bloomandwild.com/letterbox-main/the-joni/website_small/3897acee1ab1024dfa553205c5a33484.jpg',
                  'ios_upsell': '',
                  'android_carousel': [],
                  'android_main': '',
                  'android_thumb': '',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'badge': 'Limited Edition',
                'unboxing_video_id': null,
                'arrangement_video_id': null,
                'tags': []
              },
              'in_stock': false,
              'next_available': '2016-02-03',
              'pricings': [
                {
                  'id': 269,
                  'sku_id': 39,
                  'quantity': 1,
                  'amount': '26.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 268,
                  'sku_id': 39,
                  'quantity': 52,
                  'amount': '795.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 267,
                  'sku_id': 39,
                  'quantity': 26,
                  'amount': '415.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 266,
                  'sku_id': 39,
                  'quantity': 12,
                  'amount': '195.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 265,
                  'sku_id': 39,
                  'quantity': 6,
                  'amount': '100.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 264,
                  'sku_id': 39,
                  'quantity': 3,
                  'amount': '55.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 263,
                  'sku_id': 39,
                  'quantity': 1,
                  'amount': '15.00',
                  'order_type': 'Subscription',
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                }
              ]
            },
            {
              'id': 95,
              'name': 'The Ruby',
              'collection_id': 1,
              'default_bouquet_id': 271,
              'description': null,
              'slug': 'the-ruby',
              'is_addon': false,
              'finlays_display_name': 'The Ruby',
              'weight': 0.65,
              'single_only': true,
              'bundle_only': false,
              'collection': null,
              'default_bouquet': {
                'id': 271,
                'name': 'The Ruby',
                'description': 'How to make a dozen red roses more desirable? Accompany their blooms with delicious truffles from the expert chocolatiers at Prestat for the sweetest Valentine’s Day treat.',
                'instructions': 'Just like us, flowers need a bit of TLC to be at their best. Add flower food to your favourite vase and fill with clean water. Trim each stem at a 45 degree angle and repeat every couple of days to keep your bouquet blooming. \r\nIntroducing The Ruby, a timeless bouquet of a dozen red roses, freshly-cut and packaged especially for you. The head of each rose will gradually unfurl to reveal its inner beauty; simply pluck away any of the remaining outer \'guard\' petals.  \r\nYour blooms will look beautiful however you arrange them, but you might like to cut a few stems shorter to place at the front of the bouquet to created a graduated display.\r\nNow you’ve styled your blooms, show them off! Share a snap of  your #LetterboxFlowers with us on Instagram @bloomandwild and and our favourite photo of the month will win a 3 wick Neom candle and 3 months of flowers. \r\nGet in touch on hello@bloomandwild.com or 020 7352 9499',
                'collection_id': 1,
                'weekly_bouquet': false,
                'starting_on': '2016-02-09',
                'ending_on': '2016-02-14',
                'appearing_from': '2016-01-22T11:00:00.000+00:00',
                'appearing_to': '2016-02-13T17:00:00.000+00:00',
                'slug': 'the-ruby',
                'lily_free': true,
                'visible': true,
                'long_description': 'How to make a dozen red roses more desirable? Accompany their blooms with delicious truffles from the expert chocolatiers at Prestat for the sweetest Valentine’s Day treat. \r\nSend The Ruby, and alongside their blooms an irresistible box of Prestat finest’s truffles will be nestled in the signature Prestat box. \r\n\r\nWe check the quality of each rose by eye, before carefully netting the head to protect every petal during transit to ensure that your flower gift will arrive in perfect condition, always.',
                'eighteen_plus': false,
                'substitute_bouquet_id': 173,
                'limited_edition': false,
                'supplier_id': 1,
                'contents': '* 1 Alpaca Socks',
                'image_urls': {
                  'ios_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-ruby/ios_carousel/0aa6e8b9d1c2438e0345ecff4a10c7d1.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-ruby/ios_carousel/dec124c73892f86ff7c87faecc5d2c42.jpg',
                    'https://assets-0.bloomandwild.com/addon-carousel/the-ruby/ios_carousel/77f3d655493ed3b28a4fa674744f13aa.jpg',
                    'https://assets-0.bloomandwild.com/addon-carousel/the-ruby/ios_carousel/90eaeebc811e20cb8b509c37e52ae0f2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-ruby/ios_carousel/b94c5d705875c04f608facc1656095e9.jpg'
                  ],
                  'ios_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-ruby/ios_main/b94c5d705875c04f608facc1656095e9.jpg',
                  'ios_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-ruby/ios_thumb/b94c5d705875c04f608facc1656095e9.jpg',
                  'website_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-ruby/website_carousel/0aa6e8b9d1c2438e0345ecff4a10c7d1.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-ruby/website_carousel/dec124c73892f86ff7c87faecc5d2c42.jpg',
                    'https://assets-0.bloomandwild.com/addon-carousel/the-ruby/website_carousel/77f3d655493ed3b28a4fa674744f13aa.jpg',
                    'https://assets-0.bloomandwild.com/addon-carousel/the-ruby/website_carousel/90eaeebc811e20cb8b509c37e52ae0f2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-ruby/website_carousel/b94c5d705875c04f608facc1656095e9.jpg'
                  ],
                  'website_hero': 'https://assets-0.bloomandwild.com/letterbox-main/the-ruby/website_hero/b94c5d705875c04f608facc1656095e9.jpg',
                  'website_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-ruby/website_main/b94c5d705875c04f608facc1656095e9.jpg',
                  'website_medium': 'https://assets-0.bloomandwild.com/letterbox-main/the-ruby/website_medium/b94c5d705875c04f608facc1656095e9.jpg',
                  'website_small': 'https://assets-0.bloomandwild.com/letterbox-main/the-ruby/website_small/b94c5d705875c04f608facc1656095e9.jpg',
                  'ios_upsell': '',
                  'android_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-ruby/android_carousel/0aa6e8b9d1c2438e0345ecff4a10c7d1.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-ruby/android_carousel/dec124c73892f86ff7c87faecc5d2c42.jpg',
                    'https://assets-0.bloomandwild.com/addon-carousel/the-ruby/android_carousel/77f3d655493ed3b28a4fa674744f13aa.jpg',
                    'https://assets-0.bloomandwild.com/addon-carousel/the-ruby/android_carousel/90eaeebc811e20cb8b509c37e52ae0f2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-ruby/android_carousel/b94c5d705875c04f608facc1656095e9.jpg'
                  ],
                  'android_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-ruby/android_main/b94c5d705875c04f608facc1656095e9.jpg',
                  'android_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-ruby/android_thumb/b94c5d705875c04f608facc1656095e9.jpg',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'image_urls_x2': {
                  'ios_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-ruby/ios_carousel/0aa6e8b9d1c2438e0345ecff4a10c7d1_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-ruby/ios_carousel/dec124c73892f86ff7c87faecc5d2c42_x2.jpg',
                    'https://assets-0.bloomandwild.com/addon-carousel/the-ruby/ios_carousel/77f3d655493ed3b28a4fa674744f13aa_x2.jpg',
                    'https://assets-0.bloomandwild.com/addon-carousel/the-ruby/ios_carousel/90eaeebc811e20cb8b509c37e52ae0f2_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-ruby/ios_carousel/b94c5d705875c04f608facc1656095e9_x2.jpg'
                  ],
                  'ios_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-ruby/ios_main/b94c5d705875c04f608facc1656095e9_x2.jpg',
                  'ios_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-ruby/ios_thumb/b94c5d705875c04f608facc1656095e9_x2.jpg',
                  'website_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-ruby/website_carousel/0aa6e8b9d1c2438e0345ecff4a10c7d1_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-ruby/website_carousel/dec124c73892f86ff7c87faecc5d2c42_x2.jpg',
                    'https://assets-0.bloomandwild.com/addon-carousel/the-ruby/website_carousel/77f3d655493ed3b28a4fa674744f13aa_x2.jpg',
                    'https://assets-0.bloomandwild.com/addon-carousel/the-ruby/website_carousel/90eaeebc811e20cb8b509c37e52ae0f2_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-ruby/website_carousel/b94c5d705875c04f608facc1656095e9_x2.jpg'
                  ],
                  'website_hero': 'https://assets-0.bloomandwild.com/letterbox-main/the-ruby/website_hero/b94c5d705875c04f608facc1656095e9_x2.jpg',
                  'website_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-ruby/website_main/b94c5d705875c04f608facc1656095e9_x2.jpg',
                  'website_medium': 'https://assets-0.bloomandwild.com/letterbox-main/the-ruby/website_medium/b94c5d705875c04f608facc1656095e9_x2.jpg',
                  'website_small': 'https://assets-0.bloomandwild.com/letterbox-main/the-ruby/website_small/b94c5d705875c04f608facc1656095e9_x2.jpg',
                  'ios_upsell': '',
                  'android_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-ruby/android_carousel/0aa6e8b9d1c2438e0345ecff4a10c7d1_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-ruby/android_carousel/dec124c73892f86ff7c87faecc5d2c42_x2.jpg',
                    'https://assets-0.bloomandwild.com/addon-carousel/the-ruby/android_carousel/77f3d655493ed3b28a4fa674744f13aa_x2.jpg',
                    'https://assets-0.bloomandwild.com/addon-carousel/the-ruby/android_carousel/90eaeebc811e20cb8b509c37e52ae0f2_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-ruby/android_carousel/b94c5d705875c04f608facc1656095e9_x2.jpg'
                  ],
                  'android_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-ruby/android_main/b94c5d705875c04f608facc1656095e9_x2.jpg',
                  'android_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-ruby/android_thumb/b94c5d705875c04f608facc1656095e9_x2.jpg',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'badge': null,
                'unboxing_video_id': null,
                'arrangement_video_id': null,
                'tags': [
                  '12 Red Roses',
                  'Letterbox Flowers',
                  'Romantic',
                  'Flower Delivery',
                  'Gift'
                ]
              },
              'in_stock': false,
              'next_available': '2016-02-03',
              'pricings': [
                {
                  'id': 1235,
                  'sku_id': 95,
                  'quantity': 1,
                  'amount': '36.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 1234,
                  'sku_id': 95,
                  'quantity': 52,
                  'amount': '803.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 1233,
                  'sku_id': 95,
                  'quantity': 26,
                  'amount': '398.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 1232,
                  'sku_id': 95,
                  'quantity': 12,
                  'amount': '203.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 1231,
                  'sku_id': 95,
                  'quantity': 6,
                  'amount': '108.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 1230,
                  'sku_id': 95,
                  'quantity': 3,
                  'amount': '63.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 1229,
                  'sku_id': 95,
                  'quantity': 1,
                  'amount': '15.00',
                  'order_type': 'Subscription',
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                }
              ]
            },
            {
              'id': 31,
              'name': 'The Eliza',
              'collection_id': 1,
              'default_bouquet_id': 133,
              'description': '',
              'slug': 'the-eliza',
              'is_addon': false,
              'finlays_display_name': '',
              'weight': 0.7,
              'single_only': false,
              'bundle_only': false,
              'collection': null,
              'default_bouquet': {
                'id': 133,
                'name': 'The Eliza',
                'description': 'Our favourite flowers united in honour of our favourite flower girl. Pillow-soft peonies nestle alongside delicate pink roses and fragrant eucalyptus in a bouquet every bit as exuberant as its namesake.',
                'instructions': 'We hope that you enjoy The Eliza, a bouquet seasonal peonies and altitude roses designed by our florist in honour of our favourite flower girl, the bloomin\' lovely Eliza Doolittle. \r\nTo enjoy these pillow-soft flowers for as long as possible, first trim the ends of each stem at a 45 degree angle before adding to your chosen vase. \r\nPeonies have a very short season in the UK, so let these stunning blooms shine by making them the star of your bouquet. Position them in your vase first, then add the roses around them, alternating between the dark pink and softer pink varieties. \r\nFinally add the white limonim and eucalyptus around the outside of the arrangement to soften the outline of the bouquet, to evoke the feeling of exuberant wildflowers. \r\nVisit us on instagram @bloomandwild for more peony pics, and share you own on Facebook, Twitter and Instagram using the hashtag #OhMyPeony. We can\'t wait to see them!',
                'collection_id': 1,
                'weekly_bouquet': false,
                'starting_on': '2015-05-27',
                'ending_on': '2015-07-04',
                'appearing_from': '2015-05-26T15:30:00.000+01:00',
                'appearing_to': '2015-07-03T16:30:00.000+01:00',
                'slug': 'the-eliza',
                'lily_free': true,
                'visible': true,
                'long_description': '\'The difference between a lady and a flower girl is not how she behaves, but how she\'s treated.\'\r\n - George Bernard Shaw, *Pygmalion* \r\n\r\nOur favourite flowers united in honour of our favourite flower girl. Pillow-soft peonies nestle alongside delicate pink roses and fragrant eucalyptus in a bouquet every bit as exuberant as its namesake. \r\n\r\nSourced exclusively from high-altitude farms positioned on the side of a volcano, our roses are as long-lasting as they are beautiful.',
                'eighteen_plus': false,
                'substitute_bouquet_id': 131,
                'limited_edition': false,
                'supplier_id': 1,
                'contents': '',
                'image_urls': {
                  'ios_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-eliza/iphone_carousel/1910f73d46808d6e387a6934db70e3de.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-eliza/iphone_carousel/e71b57d4a9dd300e0a46018f99d131f7.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-eliza/iphone_carousel/99dcaa0bdb97069c49a5b332f806536d.jpg'
                  ],
                  'ios_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-eliza/iphone_main/2d3923955625cb1503d23fb05bcc1794.jpg',
                  'ios_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-eliza/iphone_thumb/32436415449be825660bf80b7886c0ba.jpg',
                  'website_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-eliza/website_carousel/f81197e352496718e6d9d516b93d1c34.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-eliza/website_carousel/ca0a53e8a3a13543fcd535a928b00eb6.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-eliza/website_carousel/cb7cf3b5a01d538839f1b32cee78d9e7.jpg'
                  ],
                  'website_hero': 'https://assets-0.bloomandwild.com/letterbox-main/the-eliza/website_hero/648d4f3cc2c4f4fb356470332775969b.jpg',
                  'website_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-eliza/website_main/ae3ba6b5c56a9db1d974cd4d74ef3a14.jpg',
                  'website_medium': 'https://assets-0.bloomandwild.com/letterbox-main/the-eliza/website_medium/a19e0b8dd6ca3b5e09d74cc1930e78f4.jpg',
                  'website_small': 'https://assets-0.bloomandwild.com/letterbox-main/the-eliza/website_small/6d02ada79e781abae96cce0c58b3f029.jpg',
                  'ios_upsell': '',
                  'android_carousel': [],
                  'android_main': '',
                  'android_thumb': '',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'image_urls_x2': {
                  'ios_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-eliza/iphone_carousel/1910f73d46808d6e387a6934db70e3de.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-eliza/iphone_carousel/e71b57d4a9dd300e0a46018f99d131f7.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-eliza/iphone_carousel/99dcaa0bdb97069c49a5b332f806536d.jpg'
                  ],
                  'ios_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-eliza/iphone_main/2d3923955625cb1503d23fb05bcc1794.jpg',
                  'ios_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-eliza/iphone_thumb/32436415449be825660bf80b7886c0ba.jpg',
                  'website_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-eliza/website_carousel/f81197e352496718e6d9d516b93d1c34.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-eliza/website_carousel/ca0a53e8a3a13543fcd535a928b00eb6.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-eliza/website_carousel/cb7cf3b5a01d538839f1b32cee78d9e7.jpg'
                  ],
                  'website_hero': 'https://assets-0.bloomandwild.com/letterbox-main/the-eliza/website_hero/648d4f3cc2c4f4fb356470332775969b.jpg',
                  'website_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-eliza/website_main/ae3ba6b5c56a9db1d974cd4d74ef3a14.jpg',
                  'website_medium': 'https://assets-0.bloomandwild.com/letterbox-main/the-eliza/website_medium/a19e0b8dd6ca3b5e09d74cc1930e78f4.jpg',
                  'website_small': 'https://assets-0.bloomandwild.com/letterbox-main/the-eliza/website_small/6d02ada79e781abae96cce0c58b3f029.jpg',
                  'ios_upsell': '',
                  'android_carousel': [],
                  'android_main': '',
                  'android_thumb': '',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'badge': null,
                'unboxing_video_id': null,
                'arrangement_video_id': null,
                'tags': []
              },
              'in_stock': false,
              'next_available': '2016-02-03',
              'pricings': [
                {
                  'id': 223,
                  'sku_id': 31,
                  'quantity': 1,
                  'amount': '26.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 222,
                  'sku_id': 31,
                  'quantity': 52,
                  'amount': '795.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 221,
                  'sku_id': 31,
                  'quantity': 26,
                  'amount': '415.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 220,
                  'sku_id': 31,
                  'quantity': 12,
                  'amount': '195.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 219,
                  'sku_id': 31,
                  'quantity': 6,
                  'amount': '100.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 218,
                  'sku_id': 31,
                  'quantity': 3,
                  'amount': '55.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 217,
                  'sku_id': 31,
                  'quantity': 1,
                  'amount': '15.00',
                  'order_type': 'Subscription',
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                }
              ]
            },
            {
              'id': 28,
              'name': 'Princess Charlotte',
              'collection_id': 1,
              'default_bouquet_id': 130,
              'description': '',
              'slug': 'princess-charlotte',
              'is_addon': false,
              'finlays_display_name': '',
              'weight': 0.7,
              'single_only': false,
              'bundle_only': false,
              'collection': null,
              'default_bouquet': {
                'id': 130,
                'name': 'Princess Charlotte',
                'description': 'Introducing another new arrival, Princess Charlotte - an exclusive arrangement of lilac bloom chrystanthemum and alstroemeria designed to commemorate the birth of HRH Princess Charlotte of Cambridge.\r\n\r\nAvailable for this week only, this perfectly pink bouquet is fit for a Princess.',
                'instructions': 'Your Bloom & Wild bouquet was designed by our florist and arranged by hand for you. \r\nYou have received The Princess Charlotte, our exclusive arrangement designed to celebrate the birth of HRH Princess Charlotte of Cambridge. \r\nThe arrangement comprises lilac bloom chrysanthemum, bi-colour alstroemeria, white stallion chrysanthemum, white sandriana, white hypericum and eucalyptus. \r\nGather the white sandriana leaves, hypericum berries and eucalyptus to create a base for your arrangement. Intersperse the alstromeria and stallion throughout your foliage to add height. \r\nFinally, trim the lilac blooms to different lengths, and arrange at the front of your bouquet for a stunning focal point.',
                'collection_id': 1,
                'weekly_bouquet': false,
                'starting_on': '2015-05-06',
                'ending_on': '2015-05-09',
                'appearing_from': '2015-05-05T15:30:00.000+01:00',
                'appearing_to': '2015-05-08T16:30:00.000+01:00',
                'slug': 'princess-charlotte',
                'lily_free': true,
                'visible': true,
                'long_description': 'Introducing another new arrival, Princess Charlotte - an exclusive arrangement of lilac bloom chrystanthemum and alstroemeria designed to commemorate the birth of HRH Princess Charlotte of Cambridge.\r\n\r\nAvailable for this week only, this perfectly pink bouquet is fit for a Princess.',
                'eighteen_plus': false,
                'substitute_bouquet_id': 133,
                'limited_edition': false,
                'supplier_id': 1,
                'contents': '',
                'image_urls': {
                  'ios_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-main/princess-charlotte/iphone_carousel/68a3dc756d25b6d3888cdddff9b8b6d8.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/princess-charlotte/iphone_carousel/9a93d8478e58f85e3b346a9cad7b97f5.jpg'
                  ],
                  'ios_main': 'https://assets-0.bloomandwild.com/letterbox-main/princess-charlotte/iphone_main/8a154907bac0ec9a1743d63bcd314601.jpg',
                  'ios_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/princess-charlotte/iphone_thumb/c533626c8c7284e52896f8ecfad4bce4.jpg',
                  'website_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-main/princess-charlotte/website_carousel/73a2add7bcff251454e90788a24793ac.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/princess-charlotte/website_carousel/d0be52828a3d67009b58b406f6fa2fc2.jpg'
                  ],
                  'website_hero': 'https://assets-0.bloomandwild.com/letterbox-main/princess-charlotte/website_hero/39b568519580cd0aa4423caf43cd7afd.jpg',
                  'website_main': 'https://assets-0.bloomandwild.com/letterbox-main/princess-charlotte/website_main/efc46bec5ce8165a0e180f0ccd7effe2.jpg',
                  'website_medium': 'https://assets-0.bloomandwild.com/letterbox-main/princess-charlotte/website_medium/7c1403549a93537544e693117cc5ec4a.jpg',
                  'website_small': 'https://assets-0.bloomandwild.com/letterbox-main/princess-charlotte/website_small/fa93fc45e19be113168cdf22076b452c.jpg',
                  'ios_upsell': '',
                  'android_carousel': [],
                  'android_main': '',
                  'android_thumb': '',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'image_urls_x2': {
                  'ios_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-main/princess-charlotte/iphone_carousel/68a3dc756d25b6d3888cdddff9b8b6d8.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/princess-charlotte/iphone_carousel/9a93d8478e58f85e3b346a9cad7b97f5.jpg'
                  ],
                  'ios_main': 'https://assets-0.bloomandwild.com/letterbox-main/princess-charlotte/iphone_main/8a154907bac0ec9a1743d63bcd314601.jpg',
                  'ios_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/princess-charlotte/iphone_thumb/c533626c8c7284e52896f8ecfad4bce4.jpg',
                  'website_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-main/princess-charlotte/website_carousel/73a2add7bcff251454e90788a24793ac.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/princess-charlotte/website_carousel/d0be52828a3d67009b58b406f6fa2fc2.jpg'
                  ],
                  'website_hero': 'https://assets-0.bloomandwild.com/letterbox-main/princess-charlotte/website_hero/39b568519580cd0aa4423caf43cd7afd.jpg',
                  'website_main': 'https://assets-0.bloomandwild.com/letterbox-main/princess-charlotte/website_main/efc46bec5ce8165a0e180f0ccd7effe2.jpg',
                  'website_medium': 'https://assets-0.bloomandwild.com/letterbox-main/princess-charlotte/website_medium/7c1403549a93537544e693117cc5ec4a.jpg',
                  'website_small': 'https://assets-0.bloomandwild.com/letterbox-main/princess-charlotte/website_small/fa93fc45e19be113168cdf22076b452c.jpg',
                  'ios_upsell': '',
                  'android_carousel': [],
                  'android_main': '',
                  'android_thumb': '',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'badge': null,
                'unboxing_video_id': null,
                'arrangement_video_id': null,
                'tags': []
              },
              'in_stock': false,
              'next_available': '2016-02-03',
              'pricings': [
                {
                  'id': 198,
                  'sku_id': 28,
                  'quantity': 1,
                  'amount': '15.00',
                  'order_type': 'Subscription',
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 197,
                  'sku_id': 28,
                  'quantity': 3,
                  'amount': '50.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 196,
                  'sku_id': 28,
                  'quantity': 6,
                  'amount': '100.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 195,
                  'sku_id': 28,
                  'quantity': 12,
                  'amount': '195.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 194,
                  'sku_id': 28,
                  'quantity': 26,
                  'amount': '415.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 193,
                  'sku_id': 28,
                  'quantity': 52,
                  'amount': '795.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 192,
                  'sku_id': 28,
                  'quantity': 1,
                  'amount': '24.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                }
              ]
            },
            {
              'id': 49,
              'name': 'The Leonora',
              'collection_id': 1,
              'default_bouquet_id': 171,
              'description': null,
              'slug': 'the-leonora',
              'is_addon': false,
              'finlays_display_name': 'The Leonora',
              'weight': 0.7,
              'single_only': false,
              'bundle_only': false,
              'collection': null,
              'default_bouquet': {
                'id': 171,
                'name': 'The Leonora',
                'description': 'This berry toned bouquet of hot blood, blueberry and sweetness roses will make a uniquely thoughtful gift for your sweetheart this Valentine\'s Day.',
                'instructions': 'Just like us, flowers need a bit of TLC to be at their best. Add flower food to your favourite vase and fill with clean water. Trim each stem at a 45 degree angle and repeat every couple of days to keep your bouquet blooming. \r\nIntroducing The Leonora, a berry-toned bouquet of a dozen roses, freshly-cut and hand-packaged especially for you. The head of each rose will gradually unfurl to reveal its inner beauty; simply pluck away any of the remaining outer \'guard\' petals.\r\nYour blooms will look beautiful however you arrange them, but you might like to cut a few stems shorter to place at the front of the bouquet to created a graduated display.\r\nNow you’ve styled your blooms, show them off! Share a snap of  your #LetterboxFlowers with us on Instagram @bloomandwild and and our favourite photo of the month will win a 3 wick Neom candle and 3 months of letterbox flowers. \r\nGet in touch on hello@bloomandwild.com or 020 7352 9499',
                'collection_id': 1,
                'weekly_bouquet': false,
                'starting_on': '2016-02-09',
                'ending_on': '2016-02-14',
                'appearing_from': '2016-01-22T11:00:00.000+00:00',
                'appearing_to': '2016-02-13T17:00:00.000+00:00',
                'slug': 'the-leonora',
                'lily_free': true,
                'visible': true,
                'long_description': 'Treat your Valentine to a twist on the traditional with The Leonora, our fresh take on a dozen roses. \r\n\r\nThis berry toned bouquet of hot blood, blueberry and sweetness roses will make a uniquely thoughtful gift for your sweetheart this Valentine\'s Day. \r\n\r\nWe check the quality of each rose by eye, before carefully netting the head to protect every petal during transit to ensure that your flower gift will arrive in perfect condition, always.',
                'eighteen_plus': false,
                'substitute_bouquet_id': null,
                'limited_edition': false,
                'supplier_id': 1,
                'contents': '* 4 Blueberry  Rose\n* 4 Cream Rose\n* 4 Red Rose',
                'image_urls': {
                  'ios_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-leonora/ios_carousel/6477b8ab0a0624142008068b6f4044f7.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-leonora/ios_carousel/f10eb98c8c8211d983d18814b528340c.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-leonora/ios_carousel/3ee4eb3081ec09ec8bbcc158f2909182.jpg'
                  ],
                  'ios_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-leonora/ios_main/3ee4eb3081ec09ec8bbcc158f2909182.jpg',
                  'ios_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-leonora/ios_thumb/3ee4eb3081ec09ec8bbcc158f2909182.jpg',
                  'website_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-leonora/website_carousel/6477b8ab0a0624142008068b6f4044f7.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-leonora/website_carousel/f10eb98c8c8211d983d18814b528340c.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-leonora/website_carousel/3ee4eb3081ec09ec8bbcc158f2909182.jpg'
                  ],
                  'website_hero': 'https://assets-0.bloomandwild.com/letterbox-main/the-leonora/website_hero/3ee4eb3081ec09ec8bbcc158f2909182.jpg',
                  'website_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-leonora/website_main/3ee4eb3081ec09ec8bbcc158f2909182.jpg',
                  'website_medium': 'https://assets-0.bloomandwild.com/letterbox-main/the-leonora/website_medium/3ee4eb3081ec09ec8bbcc158f2909182.jpg',
                  'website_small': 'https://assets-0.bloomandwild.com/letterbox-main/the-leonora/website_small/3ee4eb3081ec09ec8bbcc158f2909182.jpg',
                  'ios_upsell': '',
                  'android_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-leonora/android_carousel/6477b8ab0a0624142008068b6f4044f7.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-leonora/android_carousel/f10eb98c8c8211d983d18814b528340c.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-leonora/android_carousel/3ee4eb3081ec09ec8bbcc158f2909182.jpg'
                  ],
                  'android_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-leonora/android_main/3ee4eb3081ec09ec8bbcc158f2909182.jpg',
                  'android_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-leonora/android_thumb/3ee4eb3081ec09ec8bbcc158f2909182.jpg',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'image_urls_x2': {
                  'ios_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-leonora/ios_carousel/6477b8ab0a0624142008068b6f4044f7_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-leonora/ios_carousel/f10eb98c8c8211d983d18814b528340c_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-leonora/ios_carousel/3ee4eb3081ec09ec8bbcc158f2909182_x2.jpg'
                  ],
                  'ios_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-leonora/ios_main/3ee4eb3081ec09ec8bbcc158f2909182_x2.jpg',
                  'ios_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-leonora/ios_thumb/3ee4eb3081ec09ec8bbcc158f2909182_x2.jpg',
                  'website_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-leonora/website_carousel/6477b8ab0a0624142008068b6f4044f7_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-leonora/website_carousel/f10eb98c8c8211d983d18814b528340c_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-leonora/website_carousel/3ee4eb3081ec09ec8bbcc158f2909182_x2.jpg'
                  ],
                  'website_hero': 'https://assets-0.bloomandwild.com/letterbox-main/the-leonora/website_hero/3ee4eb3081ec09ec8bbcc158f2909182_x2.jpg',
                  'website_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-leonora/website_main/3ee4eb3081ec09ec8bbcc158f2909182_x2.jpg',
                  'website_medium': 'https://assets-0.bloomandwild.com/letterbox-main/the-leonora/website_medium/3ee4eb3081ec09ec8bbcc158f2909182_x2.jpg',
                  'website_small': 'https://assets-0.bloomandwild.com/letterbox-main/the-leonora/website_small/3ee4eb3081ec09ec8bbcc158f2909182_x2.jpg',
                  'ios_upsell': '',
                  'android_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-leonora/android_carousel/6477b8ab0a0624142008068b6f4044f7_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-leonora/android_carousel/f10eb98c8c8211d983d18814b528340c_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-leonora/android_carousel/3ee4eb3081ec09ec8bbcc158f2909182_x2.jpg'
                  ],
                  'android_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-leonora/android_main/3ee4eb3081ec09ec8bbcc158f2909182_x2.jpg',
                  'android_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-leonora/android_thumb/3ee4eb3081ec09ec8bbcc158f2909182_x2.jpg',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'badge': null,
                'unboxing_video_id': null,
                'arrangement_video_id': null,
                'tags': []
              },
              'in_stock': false,
              'next_available': '2016-02-03',
              'pricings': [
                {
                  'id': 403,
                  'sku_id': 49,
                  'quantity': 1,
                  'amount': '15.00',
                  'order_type': 'Subscription',
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 402,
                  'sku_id': 49,
                  'quantity': 3,
                  'amount': '55.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 401,
                  'sku_id': 49,
                  'quantity': 6,
                  'amount': '100.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 400,
                  'sku_id': 49,
                  'quantity': 12,
                  'amount': '195.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 399,
                  'sku_id': 49,
                  'quantity': 26,
                  'amount': '390.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 398,
                  'sku_id': 49,
                  'quantity': 52,
                  'amount': '795.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 397,
                  'sku_id': 49,
                  'quantity': 1,
                  'amount': '28.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                }
              ]
            },
            {
              'id': 16,
              'name': 'The Romeo',
              'collection_id': 1,
              'default_bouquet_id': 52,
              'description': '',
              'slug': 'the-romeo',
              'is_addon': false,
              'finlays_display_name': null,
              'weight': 0.9,
              'single_only': false,
              'bundle_only': false,
              'collection': null,
              'default_bouquet': {
                'id': 52,
                'name': 'The Romeo',
                'description': 'A rose by any other name might smell as sweet, but this stunning bouquet of a dozen long-stemmed deep red roses could only be The Juliet. Delivered in our unique Letterbox, it\'s a timeless Valentine\'s gift for any star-crossed lovers.',
                'instructions': 'Your Bloom & Wild bouquet was designed by our florist and prepared by hand for you. Introducing The Juliet, a simply stunning display of 12 long-stemmed deep red roses. \r\nTo arrange The Juliet, carefully remove the protective netting from each rose and trim the stems diagonally a few centimetres from the end. \r\nAt Bloom & Wild we love the simplicity of roses of the same height, but you might like to cut a few stems shorter to place at the front of the bouquet to created a graduated display. \r\nThe head of each rose will gradually open out over time, but to enjoy your bouquet for as long as possible strip any leaves that fall below the waterline and continue to trim the stems every few days.',
                'collection_id': 1,
                'weekly_bouquet': false,
                'starting_on': '2015-02-10',
                'ending_on': '2015-02-15',
                'appearing_from': '2015-02-09T15:30:00.000+00:00',
                'appearing_to': '2015-02-14T15:30:00.000+00:00',
                'slug': 'the-romeo',
                'lily_free': false,
                'visible': true,
                'long_description': 'A rose by any other name might smell as sweet, but this stunning bouquet of a dozen long-stemmed deep red roses could only be The Juliet. Delivered in our unique Letterbox, it\'s a timeless Valentine\'s gift for any star-crossed lovers.',
                'eighteen_plus': true,
                'substitute_bouquet_id': 133,
                'limited_edition': false,
                'supplier_id': 1,
                'contents': '',
                'image_urls': {
                  'ios_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-main/the-juliet/iphone_carousel/5610c866f345fac9940ec4086e3bb0dd.jpg'
                  ],
                  'ios_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-juliet/iphone_main/15e0ca98187a7ce8a2f9a177c61cf000.jpg',
                  'ios_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-juliet/iphone_thumb/c0714008c2496d145fa473d37b5f428a.jpg',
                  'website_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-main/the-juliet/website_carousel/ae84385d101b070c7da52c9088307aa9.jpg'
                  ],
                  'website_hero': '',
                  'website_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-juliet/website_main/8ffac2a678db4e7ebde5ca6ab73d95a5.jpg',
                  'website_medium': 'https://assets-0.bloomandwild.com/letterbox-main/the-juliet/website_medium/aae8a46fa19592de4bd6dd1e7a8112e2.jpg',
                  'website_small': 'https://assets-0.bloomandwild.com/letterbox-main/the-juliet/website_small/87029737f33cf279862de93171706e29.jpg',
                  'ios_upsell': '',
                  'android_carousel': [],
                  'android_main': '',
                  'android_thumb': '',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'image_urls_x2': {
                  'ios_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-main/the-juliet/iphone_carousel/5610c866f345fac9940ec4086e3bb0dd.jpg'
                  ],
                  'ios_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-juliet/iphone_main/15e0ca98187a7ce8a2f9a177c61cf000.jpg',
                  'ios_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-juliet/iphone_thumb/c0714008c2496d145fa473d37b5f428a.jpg',
                  'website_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-main/the-juliet/website_carousel/ae84385d101b070c7da52c9088307aa9.jpg'
                  ],
                  'website_hero': '',
                  'website_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-juliet/website_main/8ffac2a678db4e7ebde5ca6ab73d95a5.jpg',
                  'website_medium': 'https://assets-0.bloomandwild.com/letterbox-main/the-juliet/website_medium/aae8a46fa19592de4bd6dd1e7a8112e2.jpg',
                  'website_small': 'https://assets-0.bloomandwild.com/letterbox-main/the-juliet/website_small/87029737f33cf279862de93171706e29.jpg',
                  'ios_upsell': '',
                  'android_carousel': [],
                  'android_main': '',
                  'android_thumb': '',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'badge': null,
                'unboxing_video_id': null,
                'arrangement_video_id': null,
                'tags': []
              },
              'in_stock': false,
              'next_available': '2016-02-03',
              'pricings': [
                {
                  'id': 115,
                  'sku_id': 16,
                  'quantity': 52,
                  'amount': '795.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 114,
                  'sku_id': 16,
                  'quantity': 26,
                  'amount': '415.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 113,
                  'sku_id': 16,
                  'quantity': 12,
                  'amount': '195.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 112,
                  'sku_id': 16,
                  'quantity': 6,
                  'amount': '100.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 111,
                  'sku_id': 16,
                  'quantity': 3,
                  'amount': '55.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 110,
                  'sku_id': 16,
                  'quantity': 1,
                  'amount': '25.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 109,
                  'sku_id': 16,
                  'quantity': 1,
                  'amount': '20.00',
                  'order_type': 'Subscription',
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                }
              ]
            },
            {
              'id': 24,
              'name': 'The Marianne',
              'collection_id': 1,
              'default_bouquet_id': 123,
              'description': '',
              'slug': 'the-marianne',
              'is_addon': false,
              'finlays_display_name': '',
              'weight': 0.9,
              'single_only': false,
              'bundle_only': false,
              'collection': null,
              'default_bouquet': {
                'id': 123,
                'name': 'The Marianne',
                'description': 'When words aren\'t enough, The Marianne says it all. Oriental liles, vintage apple tea carnations and peach alstroemeria combine in this bright Letterbox bouquet for a gift that will leave them speechless.',
                'instructions': 'We hope that you enjoy The Marianne, a bright Summer bouquet designed by our florist and prepared by hand for you.\r\nTo delight in your blooms for as long as possible, snip each stem at a 45 degree angle before adding to your chosen vase. Re-trim every few days and change the water regularly to keep your flowers at their best. \r\nThe lilies are the centrepiece of this bouquet, so position these in your vase first. Trim the alstroemeria and apple tea carnations to different heights and arrange around the lilies.\r\nSlide the sandriana and pitto leaves inbetween the flower stems to give the bouquet shape, and finish by positioning the limonium around the edge of the bouquet to soften the outline of the arrangement. \r\nVisit blog.bloomandwild.com for more flower arranging inspiration, and don\'t forget to share your styling with us on instagram @bloomandwild.',
                'collection_id': 1,
                'weekly_bouquet': false,
                'starting_on': '2015-05-06',
                'ending_on': '2015-07-11',
                'appearing_from': '2015-05-05T15:30:00.000+01:00',
                'appearing_to': '2015-07-10T16:30:00.000+01:00',
                'slug': 'the-marianne',
                'lily_free': false,
                'visible': true,
                'long_description': '\'And sometimes I have kept my feelings to myself, because I could find no language to describe them in.\'  \r\n           - Jane Austen, *Sense and Sensibility*\r\n\r\nWhen you can\'t find the words, The Marianne says it all. Oriental liles, vintage apple tea carnations and peach alstroemeria combine in this bright Letterbox bouquet for a gift that will leave them speechless.',
                'eighteen_plus': false,
                'substitute_bouquet_id': 159,
                'limited_edition': false,
                'supplier_id': 1,
                'contents': '',
                'image_urls': {
                  'ios_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-marianne/iphone_carousel/b0e093ec673a2a0f9423fc6046984cf7.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-marianne/iphone_carousel/d928a4145de466226ee4ab8f1c2b06ba.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-marianne/iphone_carousel/23b6bd753782dead56b6a6ca963bae6d.jpg'
                  ],
                  'ios_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-marianne/iphone_main/2fa8d20e4b31a218f0004c427714f33b.jpg',
                  'ios_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-marianne/iphone_thumb/da3a859a450cf6e61b1884de6107a3d3.jpg',
                  'website_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-marianne/website_carousel/b14f470c769bd53547623848744e243a.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-marianne/website_carousel/87ca2c5f64e57ea77b01e3a44fda76ff.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-marianne/website_carousel/52697137d07d8d849633795c34ce32f5.jpg'
                  ],
                  'website_hero': 'https://assets-0.bloomandwild.com/letterbox-main/the-marianne/website_hero/7275b18715b7c75b91cbed585ea2b48d.jpg',
                  'website_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-marianne/website_main/475b90512cb5b2c96642b29ff9234c9f.jpg',
                  'website_medium': 'https://assets-0.bloomandwild.com/letterbox-main/the-marianne/website_medium/73c5b7fdfde5c4c297ac931854ec3b4c.jpg',
                  'website_small': 'https://assets-0.bloomandwild.com/letterbox-main/the-marianne/website_small/b330fd4846d540c677a7698a483dde17.jpg',
                  'ios_upsell': '',
                  'android_carousel': [],
                  'android_main': '',
                  'android_thumb': '',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'image_urls_x2': {
                  'ios_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-marianne/iphone_carousel/b0e093ec673a2a0f9423fc6046984cf7.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-marianne/iphone_carousel/d928a4145de466226ee4ab8f1c2b06ba.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-marianne/iphone_carousel/23b6bd753782dead56b6a6ca963bae6d.jpg'
                  ],
                  'ios_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-marianne/iphone_main/2fa8d20e4b31a218f0004c427714f33b.jpg',
                  'ios_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-marianne/iphone_thumb/da3a859a450cf6e61b1884de6107a3d3.jpg',
                  'website_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-marianne/website_carousel/b14f470c769bd53547623848744e243a.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-marianne/website_carousel/87ca2c5f64e57ea77b01e3a44fda76ff.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-marianne/website_carousel/52697137d07d8d849633795c34ce32f5.jpg'
                  ],
                  'website_hero': 'https://assets-0.bloomandwild.com/letterbox-main/the-marianne/website_hero/7275b18715b7c75b91cbed585ea2b48d.jpg',
                  'website_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-marianne/website_main/475b90512cb5b2c96642b29ff9234c9f.jpg',
                  'website_medium': 'https://assets-0.bloomandwild.com/letterbox-main/the-marianne/website_medium/73c5b7fdfde5c4c297ac931854ec3b4c.jpg',
                  'website_small': 'https://assets-0.bloomandwild.com/letterbox-main/the-marianne/website_small/b330fd4846d540c677a7698a483dde17.jpg',
                  'ios_upsell': '',
                  'android_carousel': [],
                  'android_main': '',
                  'android_thumb': '',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'badge': null,
                'unboxing_video_id': null,
                'arrangement_video_id': null,
                'tags': []
              },
              'in_stock': false,
              'next_available': '2016-02-03',
              'pricings': [
                {
                  'id': 162,
                  'sku_id': 24,
                  'quantity': 1,
                  'amount': '15.00',
                  'order_type': 'Subscription',
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 161,
                  'sku_id': 24,
                  'quantity': 3,
                  'amount': '50.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 160,
                  'sku_id': 24,
                  'quantity': 6,
                  'amount': '100.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 159,
                  'sku_id': 24,
                  'quantity': 12,
                  'amount': '195.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 158,
                  'sku_id': 24,
                  'quantity': 26,
                  'amount': '415.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 157,
                  'sku_id': 24,
                  'quantity': 52,
                  'amount': '795.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 156,
                  'sku_id': 24,
                  'quantity': 1,
                  'amount': '22.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                }
              ]
            },
            {
              'id': 29,
              'name': 'The Chelsea',
              'collection_id': 1,
              'default_bouquet_id': 131,
              'description': '',
              'slug': 'the-chelsea',
              'is_addon': false,
              'finlays_display_name': '',
              'weight': 0.91,
              'single_only': false,
              'bundle_only': false,
              'collection': null,
              'default_bouquet': {
                'id': 131,
                'name': 'The Chelsea',
                'description': 'When we launched our limited edition Chelsea Flower Show bouquet earlier this year, we knew she was a winner. \r\n\r\nYou loved her. We loved her. So we couldn’t resist bringing this beautiful bouquet of roses, lisianthus and eucalyptus back.',
                'instructions': 'We hope that you enjoy The Chelsea, a show-stopping bouquet of altitude roses, pink lisianthus and fragrant eucalyptus.\r\nTo enjoy your flowers for many days to come, simply trim the ends of each stem at a 45 degree angle before adding them to your chosen vase. \r\nThe roses are the centrepiece of this bouquet, so position these in your vase first, alternating between the darker pink and soft pink roses. Trim the lisianthus to different heights and position inbetween the roses.\r\nFinally add the white limonim and eucalyptus around the outside of the arrangement to soften the outline of the bouquet, to evoke the feeling of exuberant wildflowers. \r\nVisit blog.bloomandwild.com for more flower arranging inspiration, and don\'t forget to share your styling with us on instagram @bloomandwild.',
                'collection_id': 1,
                'weekly_bouquet': false,
                'starting_on': '2015-06-28',
                'ending_on': '2015-09-05',
                'appearing_from': '2015-06-27T15:30:00.000+01:00',
                'appearing_to': '2015-09-04T16:30:00.000+01:00',
                'slug': 'the-chelsea',
                'lily_free': true,
                'visible': true,
                'long_description': 'When we launched our limited edition Chelsea Flower Show bouquet earlier this year, we knew she was a winner. \r\n\r\nYou loved her. We loved her. So we couldn’t resist bringing this beauty back for the Summer. \r\n\r\nAltitude roses, delicate pink lisianthus and baby blue eucalyptus mean that this bouquet is sure to win the heart of the lucky recipient.',
                'eighteen_plus': false,
                'substitute_bouquet_id': 173,
                'limited_edition': false,
                'supplier_id': 1,
                'contents': '* 4 Celebration Rose\n* 5 Lisianthus\n* 4 Bella Rose\n* 2 Eucalyptus\n* 2 White Limonium',
                'image_urls': {
                  'ios_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-main/the-chelsea/ios_carousel/e10d0c2740efc2f3ae98cab2a84b3ece.jpg'
                  ],
                  'ios_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-chelsea/ios_main/e10d0c2740efc2f3ae98cab2a84b3ece.jpg',
                  'ios_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-chelsea/ios_thumb/e10d0c2740efc2f3ae98cab2a84b3ece.jpg',
                  'website_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-chelsea/website_carousel/a5f3f187d9df7e475e94cb2bf688cda8.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-chelsea/website_carousel/e10d0c2740efc2f3ae98cab2a84b3ece.jpg'
                  ],
                  'website_hero': 'https://assets-0.bloomandwild.com/letterbox-main/the-chelsea/website_hero/e10d0c2740efc2f3ae98cab2a84b3ece.jpg',
                  'website_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-chelsea/website_main/e10d0c2740efc2f3ae98cab2a84b3ece.jpg',
                  'website_medium': 'https://assets-0.bloomandwild.com/letterbox-main/the-chelsea/website_medium/e10d0c2740efc2f3ae98cab2a84b3ece.jpg',
                  'website_small': 'https://assets-0.bloomandwild.com/letterbox-main/the-chelsea/website_small/e10d0c2740efc2f3ae98cab2a84b3ece.jpg',
                  'ios_upsell': '',
                  'android_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-main/the-chelsea/android_carousel/e10d0c2740efc2f3ae98cab2a84b3ece.jpg'
                  ],
                  'android_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-chelsea/android_main/e10d0c2740efc2f3ae98cab2a84b3ece.jpg',
                  'android_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-chelsea/android_thumb/e10d0c2740efc2f3ae98cab2a84b3ece.jpg',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'image_urls_x2': {
                  'ios_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-main/the-chelsea/ios_carousel/e10d0c2740efc2f3ae98cab2a84b3ece_x2.jpg'
                  ],
                  'ios_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-chelsea/ios_main/e10d0c2740efc2f3ae98cab2a84b3ece_x2.jpg',
                  'ios_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-chelsea/ios_thumb/e10d0c2740efc2f3ae98cab2a84b3ece_x2.jpg',
                  'website_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-chelsea/website_carousel/a5f3f187d9df7e475e94cb2bf688cda8_x2.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-chelsea/website_carousel/e10d0c2740efc2f3ae98cab2a84b3ece_x2.jpg'
                  ],
                  'website_hero': 'https://assets-0.bloomandwild.com/letterbox-main/the-chelsea/website_hero/e10d0c2740efc2f3ae98cab2a84b3ece_x2.jpg',
                  'website_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-chelsea/website_main/e10d0c2740efc2f3ae98cab2a84b3ece_x2.jpg',
                  'website_medium': 'https://assets-0.bloomandwild.com/letterbox-main/the-chelsea/website_medium/e10d0c2740efc2f3ae98cab2a84b3ece_x2.jpg',
                  'website_small': 'https://assets-0.bloomandwild.com/letterbox-main/the-chelsea/website_small/e10d0c2740efc2f3ae98cab2a84b3ece_x2.jpg',
                  'ios_upsell': '',
                  'android_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-main/the-chelsea/android_carousel/e10d0c2740efc2f3ae98cab2a84b3ece_x2.jpg'
                  ],
                  'android_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-chelsea/android_main/e10d0c2740efc2f3ae98cab2a84b3ece_x2.jpg',
                  'android_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-chelsea/android_thumb/e10d0c2740efc2f3ae98cab2a84b3ece_x2.jpg',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'badge': null,
                'unboxing_video_id': null,
                'arrangement_video_id': null,
                'tags': []
              },
              'in_stock': false,
              'next_available': '2016-02-03',
              'pricings': [
                {
                  'id': 207,
                  'sku_id': 29,
                  'quantity': 1,
                  'amount': '15.00',
                  'order_type': 'Subscription',
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 206,
                  'sku_id': 29,
                  'quantity': 3,
                  'amount': '55.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 205,
                  'sku_id': 29,
                  'quantity': 6,
                  'amount': '100.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 204,
                  'sku_id': 29,
                  'quantity': 12,
                  'amount': '195.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 203,
                  'sku_id': 29,
                  'quantity': 26,
                  'amount': '415.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 202,
                  'sku_id': 29,
                  'quantity': 52,
                  'amount': '795.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 201,
                  'sku_id': 29,
                  'quantity': 1,
                  'amount': '26.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                }
              ]
            },
            {
              'id': 2,
              'name': 'The Amelia',
              'collection_id': 1,
              'default_bouquet_id': 2,
              'description': 'The Amelia is a classic set of flowers, they look delightful.',
              'slug': 'the-amelia',
              'is_addon': false,
              'finlays_display_name': null,
              'weight': 1,
              'single_only': false,
              'bundle_only': false,
              'collection': null,
              'default_bouquet': {
                'id': 2,
                'name': 'The Amelia',
                'description': 'The Amelia is peachy keen and eager to please. It is made up of peach lilies, apple tea carnations, cream madiba, varigated pitto leaves and sugar flair hypericum.',
                'instructions': 'Your arrangement is The Amelia; peachy keen and eager to please.\r\nTrim all your stems to the same length, at a 45 degree angle. \r\nStart by adding your variegated pitto leaves and sugar flair hypericum berries to create a full base.\r\nNow slot in your peach lilies, apple tea carnations and cream madiba, ensuring that each variety is evenly distributed throughout your arrangement.',
                'collection_id': 1,
                'weekly_bouquet': false,
                'starting_on': '2014-08-01',
                'ending_on': '2014-11-22',
                'appearing_from': '2014-07-31T15:30:00.000+01:00',
                'appearing_to': '2014-11-21T15:30:00.000+00:00',
                'slug': 'the-amelia',
                'lily_free': false,
                'visible': true,
                'long_description': 'The Amelia is peachy keen and eager to please. It is made up of peach lilies, apple tea carnations, cream madiba, varigated pitto leaves and sugar flair hypericum.',
                'eighteen_plus': false,
                'substitute_bouquet_id': 123,
                'limited_edition': false,
                'supplier_id': 1,
                'contents': '',
                'image_urls': {
                  'ios_carousel': [],
                  'ios_main': '',
                  'ios_thumb': '',
                  'website_carousel': [],
                  'website_hero': '',
                  'website_main': '',
                  'website_medium': '',
                  'website_small': '',
                  'ios_upsell': '',
                  'android_carousel': [],
                  'android_main': '',
                  'android_thumb': '',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'image_urls_x2': {
                  'ios_carousel': [],
                  'ios_main': '',
                  'ios_thumb': '',
                  'website_carousel': [],
                  'website_hero': '',
                  'website_main': '',
                  'website_medium': '',
                  'website_small': '',
                  'ios_upsell': '',
                  'android_carousel': [],
                  'android_main': '',
                  'android_thumb': '',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'badge': null,
                'unboxing_video_id': null,
                'arrangement_video_id': null,
                'tags': []
              },
              'in_stock': false,
              'next_available': '2016-02-03',
              'pricings': [
                {
                  'id': 39,
                  'sku_id': 2,
                  'quantity': 1,
                  'amount': '20.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 12,
                  'sku_id': 2,
                  'quantity': 52,
                  'amount': '825.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 11,
                  'sku_id': 2,
                  'quantity': 26,
                  'amount': '415.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 10,
                  'sku_id': 2,
                  'quantity': 12,
                  'amount': '195.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 9,
                  'sku_id': 2,
                  'quantity': 6,
                  'amount': '100.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 8,
                  'sku_id': 2,
                  'quantity': 3,
                  'amount': '50.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 7,
                  'sku_id': 2,
                  'quantity': 1,
                  'amount': '15.00',
                  'order_type': 'Subscription',
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                }
              ]
            },
            {
              'id': 1,
              'name': 'The Minerva',
              'collection_id': 1,
              'default_bouquet_id': 1,
              'description': 'The Minerva is a classic set of flowers, they look delightful.',
              'slug': 'the-minerva',
              'is_addon': false,
              'finlays_display_name': null,
              'weight': 1,
              'single_only': false,
              'bundle_only': false,
              'collection': null,
              'default_bouquet': {
                'id': 1,
                'name': 'The Minerva',
                'description': 'The Minerva is inspired by the strength, wisdom and beauty of the goddess of a thousand words. It is made up of liatris, lilac bloom chrysanthemums, Minerva carnations, madiba and cordyline red top and ruscus.',
                'instructions': 'Introducing The Minerva, inspired by the strength, wisdom and beauty of the goddess of a thousand words.\r\nFirstly, add your glossy ruscus and eucaplytus leaves to the vase to support your other flowers.\r\nCut the pointed purple liatris so they are taller than your foliage and add into the vase.\r\nTrim the lilac chrysanthemum blooms, madiba and Minerva carnations so they sit lower than the liatris to give added depth and dimension.',
                'collection_id': 1,
                'weekly_bouquet': false,
                'starting_on': '2014-08-01',
                'ending_on': '2014-11-22',
                'appearing_from': '2014-07-31T15:30:00.000+01:00',
                'appearing_to': '2014-11-21T15:30:00.000+00:00',
                'slug': 'the-minerva',
                'lily_free': false,
                'visible': true,
                'long_description': 'The Minerva is inspired by the strength, wisdom and beauty of the goddess of a thousand words. It is made up of liatris, lilac bloom chrysanthemums, Minerva carnations, madiba and cordyline red top and ruscus.',
                'eighteen_plus': false,
                'substitute_bouquet_id': 123,
                'limited_edition': false,
                'supplier_id': 1,
                'contents': '',
                'image_urls': {
                  'ios_carousel': [],
                  'ios_main': '',
                  'ios_thumb': '',
                  'website_carousel': [],
                  'website_hero': '',
                  'website_main': '',
                  'website_medium': '',
                  'website_small': '',
                  'ios_upsell': '',
                  'android_carousel': [],
                  'android_main': '',
                  'android_thumb': '',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'image_urls_x2': {
                  'ios_carousel': [],
                  'ios_main': '',
                  'ios_thumb': '',
                  'website_carousel': [],
                  'website_hero': '',
                  'website_main': '',
                  'website_medium': '',
                  'website_small': '',
                  'ios_upsell': '',
                  'android_carousel': [],
                  'android_main': '',
                  'android_thumb': '',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'badge': null,
                'unboxing_video_id': null,
                'arrangement_video_id': null,
                'tags': []
              },
              'in_stock': false,
              'next_available': '2016-02-03',
              'pricings': [
                {
                  'id': 43,
                  'sku_id': 1,
                  'quantity': 4,
                  'amount': '70.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 38,
                  'sku_id': 1,
                  'quantity': 1,
                  'amount': '20.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 6,
                  'sku_id': 1,
                  'quantity': 52,
                  'amount': '825.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 5,
                  'sku_id': 1,
                  'quantity': 26,
                  'amount': '415.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 4,
                  'sku_id': 1,
                  'quantity': 12,
                  'amount': '195.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 3,
                  'sku_id': 1,
                  'quantity': 6,
                  'amount': '100.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 2,
                  'sku_id': 1,
                  'quantity': 3,
                  'amount': '50.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 1,
                  'sku_id': 1,
                  'quantity': 1,
                  'amount': '15.00',
                  'order_type': 'Subscription',
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                }
              ]
            },
            {
              'id': 7,
              'name': 'The Lucy',
              'collection_id': 1,
              'default_bouquet_id': 39,
              'description': null,
              'slug': 'the-lucy',
              'is_addon': false,
              'finlays_display_name': null,
              'weight': 1,
              'single_only': false,
              'bundle_only': false,
              'collection': null,
              'default_bouquet': {
                'id': 39,
                'name': 'The Lucy',
                'description': 'Add a touch of sophisticated winter sparkle with The Lucy. Inspired by the snowy forests of Narnia, this arrangement combines white bloom chrystanthemums, eryngium orion, fir and hypericum berries.',
                'instructions': 'The Lucy was designed by our florist and chosen for you. Inspired by the snowy forests of Narnia, the arrangement combines white bloom chrystanthemums, eryngium orion and hypericum berries with a touch of winter sparkle.\r\nGather the laurel, pistachio and eucalyptus to create a base for your arrangement. Intersperse the berries and eryngium throughout and place birch twigs around the edges of the foliage to add height. \r\nFinally, trim the white blooms to different lengths, and arrange in the centre of your bouquet for a stunning focal point.',
                'collection_id': 1,
                'weekly_bouquet': false,
                'starting_on': '2014-11-25',
                'ending_on': '2015-01-11',
                'appearing_from': '2014-11-24T15:30:00.000+00:00',
                'appearing_to': '2015-01-10T15:30:00.000+00:00',
                'slug': 'the-lucy',
                'lily_free': false,
                'visible': true,
                'long_description': 'Add a touch of sophisticated winter sparkle with The Lucy. Inspired by the snowy forests of Narnia, this arrangement combines white bloom chrystanthemums, eryngium orion, fir and hypericum berries.',
                'eighteen_plus': false,
                'substitute_bouquet_id': 122,
                'limited_edition': false,
                'supplier_id': 1,
                'contents': '',
                'image_urls': {
                  'ios_carousel': [],
                  'ios_main': '',
                  'ios_thumb': '',
                  'website_carousel': [],
                  'website_hero': '',
                  'website_main': '',
                  'website_medium': '',
                  'website_small': '',
                  'ios_upsell': '',
                  'android_carousel': [],
                  'android_main': '',
                  'android_thumb': '',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'image_urls_x2': {
                  'ios_carousel': [],
                  'ios_main': '',
                  'ios_thumb': '',
                  'website_carousel': [],
                  'website_hero': '',
                  'website_main': '',
                  'website_medium': '',
                  'website_small': '',
                  'ios_upsell': '',
                  'android_carousel': [],
                  'android_main': '',
                  'android_thumb': '',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'badge': null,
                'unboxing_video_id': null,
                'arrangement_video_id': null,
                'tags': []
              },
              'in_stock': false,
              'next_available': '2016-02-03',
              'pricings': [
                {
                  'id': 51,
                  'sku_id': 7,
                  'quantity': 1,
                  'amount': '15.00',
                  'order_type': 'Subscription',
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 50,
                  'sku_id': 7,
                  'quantity': 3,
                  'amount': '50.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 49,
                  'sku_id': 7,
                  'quantity': 6,
                  'amount': '100.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 48,
                  'sku_id': 7,
                  'quantity': 12,
                  'amount': '195.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 47,
                  'sku_id': 7,
                  'quantity': 26,
                  'amount': '415.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 46,
                  'sku_id': 7,
                  'quantity': 52,
                  'amount': '825.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 45,
                  'sku_id': 7,
                  'quantity': 1,
                  'amount': '20.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 44,
                  'sku_id': 7,
                  'quantity': 4,
                  'amount': '70.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                }
              ]
            },
            {
              'id': 8,
              'name': 'The Beatrix',
              'collection_id': 1,
              'default_bouquet_id': 40,
              'description': null,
              'slug': 'the-beatrix',
              'is_addon': false,
              'finlays_display_name': null,
              'weight': 1,
              'single_only': false,
              'bundle_only': false,
              'collection': null,
              'default_bouquet': {
                'id': 40,
                'name': 'The Beatrix',
                'description': 'Velvety petals and festive fragrances combine with a hint of Christmas sparkle in this traditional Christmas arrangement, featuring burgundy carnations, rosemary, cinnamon and fir.',
                'instructions': 'The Beatrix was designed by our florist and chosen for you. Velvety petals and festive fragrances combine with a hint of gold in this traditional arrangement that features burgundy carnations, rosemary, cinnamon and fir.\r\nGather the fir, ruscus and rosemary to create a base for your arrangement. Keeping the bear grass tied together, insert this in the centre of the foliage. \r\nIntersperse the carnations, leucadenron and eryngium throughout. Finally, position the cinnamon and hypericum berries, and pull out individual strands of bear grass for movement and height.',
                'collection_id': 1,
                'weekly_bouquet': false,
                'starting_on': '2014-11-25',
                'ending_on': '2015-01-11',
                'appearing_from': '2014-11-24T15:30:00.000+00:00',
                'appearing_to': '2015-01-10T15:30:00.000+00:00',
                'slug': 'the-beatrix',
                'lily_free': false,
                'visible': true,
                'long_description': 'Velvety petals and festive fragrances combine with a hint of Christmas sparkle in this traditional Christmas arrangement, featuring burgundy carnations, rosemary, cinnamon and fir.',
                'eighteen_plus': false,
                'substitute_bouquet_id': 122,
                'limited_edition': false,
                'supplier_id': 1,
                'contents': '',
                'image_urls': {
                  'ios_carousel': [],
                  'ios_main': '',
                  'ios_thumb': '',
                  'website_carousel': [],
                  'website_hero': '',
                  'website_main': '',
                  'website_medium': '',
                  'website_small': '',
                  'ios_upsell': '',
                  'android_carousel': [],
                  'android_main': '',
                  'android_thumb': '',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'image_urls_x2': {
                  'ios_carousel': [],
                  'ios_main': '',
                  'ios_thumb': '',
                  'website_carousel': [],
                  'website_hero': '',
                  'website_main': '',
                  'website_medium': '',
                  'website_small': '',
                  'ios_upsell': '',
                  'android_carousel': [],
                  'android_main': '',
                  'android_thumb': '',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'badge': null,
                'unboxing_video_id': null,
                'arrangement_video_id': null,
                'tags': []
              },
              'in_stock': false,
              'next_available': '2016-02-03',
              'pricings': [
                {
                  'id': 58,
                  'sku_id': 8,
                  'quantity': 1,
                  'amount': '15.00',
                  'order_type': 'Subscription',
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 57,
                  'sku_id': 8,
                  'quantity': 3,
                  'amount': '50.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 56,
                  'sku_id': 8,
                  'quantity': 6,
                  'amount': '100.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 55,
                  'sku_id': 8,
                  'quantity': 12,
                  'amount': '195.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 54,
                  'sku_id': 8,
                  'quantity': 26,
                  'amount': '415.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 53,
                  'sku_id': 8,
                  'quantity': 52,
                  'amount': '825.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 52,
                  'sku_id': 8,
                  'quantity': 1,
                  'amount': '20.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                }
              ]
            },
            {
              'id': 3,
              'name': 'The Emma',
              'collection_id': 1,
              'default_bouquet_id': 3,
              'description': 'The Emma is a classic set of flowers, they look delightful.',
              'slug': 'the-emma',
              'is_addon': false,
              'finlays_display_name': null,
              'weight': 1,
              'single_only': false,
              'bundle_only': false,
              'collection': null,
              'default_bouquet': {
                'id': 3,
                'name': 'The Emma',
                'description': 'Introducing The Emma; exuberant, irrepressible and bursting with beauty. It comprises pink Asiatic lilies, pale pink alstroemeria, bi-colour lisianthus,and pink waxflower.',
                'instructions': 'Your Bloom & Wild bouquet was designed by our florist and prepared by hand for you. Introducing The Emma; exuberant, irrepressible and bursting with beauty. \r\nIt comprises Asiatic lilies, pale pink alstroemeria, bi-colour lisianthus,and pink waxflower.\r\nBegin to arrange your bouquet by gathering your pitto leaves,the waxflower and madiba to create a full base. You might like to break up the madiba into smaller bunches for more variety in your bouquet. \r\nNext, evenly distribute the lisianthus and alstroemeria throughout, before finally positioning the liles at the front of your arrangement for a beautiful focal point.',
                'collection_id': 1,
                'weekly_bouquet': false,
                'starting_on': '2014-08-01',
                'ending_on': '2015-02-16',
                'appearing_from': '2014-07-31T15:30:00.000+01:00',
                'appearing_to': '2015-02-15T15:30:00.000+00:00',
                'slug': 'the-emma',
                'lily_free': false,
                'visible': true,
                'long_description': 'Introducing The Emma; exuberant, irrepressible and bursting with beauty. It comprises pink Asiatic lilies, pale pink alstroemeria, bi-colour lisianthus,and pink waxflower.',
                'eighteen_plus': false,
                'substitute_bouquet_id': 123,
                'limited_edition': false,
                'supplier_id': 1,
                'contents': '',
                'image_urls': {
                  'ios_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-main/the-emma/iphone_carousel/dd067e24bcfb01d213f88e22c065ccf2.jpg'
                  ],
                  'ios_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-emma/iphone_main/0acf2a455ee86a92e657ccf54f19b580.jpg',
                  'ios_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-emma/iphone_thumb/9165525805f3a678682ac28f23948686.jpg',
                  'website_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-main/the-emma/website_carousel/aa8e1e355e94ffbda20fc5fb3fa50708.jpg'
                  ],
                  'website_hero': '',
                  'website_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-emma/website_main/1aa63a90f52caa90e9cc5bf5e2e7f508.jpg',
                  'website_medium': 'https://assets-0.bloomandwild.com/letterbox-main/the-emma/website_medium/23640d7901c606a1c31e76b5ec182e59.jpg',
                  'website_small': 'https://assets-0.bloomandwild.com/letterbox-main/the-emma/website_small/2f276f211c515a6e5808425b4382f05f.jpg',
                  'ios_upsell': '',
                  'android_carousel': [],
                  'android_main': '',
                  'android_thumb': '',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'image_urls_x2': {
                  'ios_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-main/the-emma/iphone_carousel/dd067e24bcfb01d213f88e22c065ccf2.jpg'
                  ],
                  'ios_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-emma/iphone_main/0acf2a455ee86a92e657ccf54f19b580.jpg',
                  'ios_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-emma/iphone_thumb/9165525805f3a678682ac28f23948686.jpg',
                  'website_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-main/the-emma/website_carousel/aa8e1e355e94ffbda20fc5fb3fa50708.jpg'
                  ],
                  'website_hero': '',
                  'website_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-emma/website_main/1aa63a90f52caa90e9cc5bf5e2e7f508.jpg',
                  'website_medium': 'https://assets-0.bloomandwild.com/letterbox-main/the-emma/website_medium/23640d7901c606a1c31e76b5ec182e59.jpg',
                  'website_small': 'https://assets-0.bloomandwild.com/letterbox-main/the-emma/website_small/2f276f211c515a6e5808425b4382f05f.jpg',
                  'ios_upsell': '',
                  'android_carousel': [],
                  'android_main': '',
                  'android_thumb': '',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'badge': null,
                'unboxing_video_id': null,
                'arrangement_video_id': null,
                'tags': []
              },
              'in_stock': false,
              'next_available': '2016-02-03',
              'pricings': [
                {
                  'id': 40,
                  'sku_id': 3,
                  'quantity': 1,
                  'amount': '20.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 18,
                  'sku_id': 3,
                  'quantity': 52,
                  'amount': '795.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 17,
                  'sku_id': 3,
                  'quantity': 26,
                  'amount': '415.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 16,
                  'sku_id': 3,
                  'quantity': 12,
                  'amount': '195.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 15,
                  'sku_id': 3,
                  'quantity': 6,
                  'amount': '100.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 14,
                  'sku_id': 3,
                  'quantity': 3,
                  'amount': '50.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 13,
                  'sku_id': 3,
                  'quantity': 1,
                  'amount': '15.00',
                  'order_type': 'Subscription',
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                }
              ]
            },
            {
              'id': 25,
              'name': 'The Gloria',
              'collection_id': 1,
              'default_bouquet_id': 124,
              'description': null,
              'slug': 'the-gloria',
              'is_addon': false,
              'finlays_display_name': null,
              'weight': 1,
              'single_only': false,
              'bundle_only': false,
              'collection': null,
              'default_bouquet': {
                'id': 124,
                'name': 'The Gloria',
                'description': 'Inspired by the beauty and decadence of New York during the Jazz Age, The Gloria is a stunning statement bouquet that\'s sure to wow.',
                'instructions': 'We hope that you enjoy The Gloria, a bouquet designed by our florist and inspired by the beauty and decadence of Jazz Age New York.\r\nTo enjoy your blooms for as long as possible, snip each stem at a 45 degree angle before adding to your chosen vase. Re-trim every few days and change the water regularly to keep your flowers at their best. \r\nThe lilies are the centrepiece of this bouquet, so position these in your vase first. Trim the alstroemeria and lisianthus to different heights and arrange around the lilies to give the bouquet shape. \r\nSlide the large leaf eucalyptus around the edge of the vase to create a collar-effect, and finish by nestling the hypericum berries at intervals throughout the display. \r\nVisit blog.bloomandwild.com for more flower arranging inspiration, and don\'t forget to share your styling with us on instagram @bloomandwild.',
                'collection_id': 1,
                'weekly_bouquet': false,
                'starting_on': '2015-05-06',
                'ending_on': '2015-08-01',
                'appearing_from': '2015-05-05T15:30:00.000+01:00',
                'appearing_to': '2015-07-31T16:30:00.000+01:00',
                'slug': 'the-gloria',
                'lily_free': false,
                'visible': true,
                'long_description': '“She was dazzling-- alight; it was agony to comprehend her beauty in a glance.”  \r\n ― F. Scott Fitzgerald, *The Beautiful And Damned*\r\n\r\nInspired by the beauty and decadence of New York during the Jazz Age, The Gloria embodies the freedom and excess of the era. \r\n\r\nBold purples and timeless white lilies combine in this stunning statement bouquet that\'s sure to wow.',
                'eighteen_plus': false,
                'substitute_bouquet_id': 163,
                'limited_edition': false,
                'supplier_id': 1,
                'contents': '',
                'image_urls': {
                  'ios_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-gloria/iphone_carousel/58801e4da2be1c934d17ec0bac9b30ab.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-gloria/iphone_carousel/ea5492ffc16dcc02a744bf5d094dfd2a.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-gloria/iphone_carousel/5412ec68235756a40e8e984998574a39.jpg'
                  ],
                  'ios_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-gloria/iphone_main/eaba621bcde31a869921430e619f9c5c.jpg',
                  'ios_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-gloria/iphone_thumb/1261766d37664d406427dc63753feb04.jpg',
                  'website_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-gloria/website_carousel/69e893883755f6d5b5ffa81a34584fee.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-gloria/website_carousel/44f2f7895fe35d6134036fa61885f080.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-gloria/website_carousel/b12b5195f284da94ee5afa5ccba192b0.jpg'
                  ],
                  'website_hero': 'https://assets-0.bloomandwild.com/letterbox-main/the-gloria/website_hero/9f5714075e63371d405759ee706fa7c8.jpg',
                  'website_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-gloria/website_main/4506d582488b0f812a2182ba5bc0f813.jpg',
                  'website_medium': 'https://assets-0.bloomandwild.com/letterbox-main/the-gloria/website_medium/d999c3a338aaec501d09033dfedd3da0.jpg',
                  'website_small': 'https://assets-0.bloomandwild.com/letterbox-main/the-gloria/website_small/f033bf929addf199881c153dfa56e89c.jpg',
                  'ios_upsell': '',
                  'android_carousel': [],
                  'android_main': '',
                  'android_thumb': '',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'image_urls_x2': {
                  'ios_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-gloria/iphone_carousel/58801e4da2be1c934d17ec0bac9b30ab.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-gloria/iphone_carousel/ea5492ffc16dcc02a744bf5d094dfd2a.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-gloria/iphone_carousel/5412ec68235756a40e8e984998574a39.jpg'
                  ],
                  'ios_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-gloria/iphone_main/eaba621bcde31a869921430e619f9c5c.jpg',
                  'ios_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-gloria/iphone_thumb/1261766d37664d406427dc63753feb04.jpg',
                  'website_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-gloria/website_carousel/69e893883755f6d5b5ffa81a34584fee.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-gloria/website_carousel/44f2f7895fe35d6134036fa61885f080.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-gloria/website_carousel/b12b5195f284da94ee5afa5ccba192b0.jpg'
                  ],
                  'website_hero': 'https://assets-0.bloomandwild.com/letterbox-main/the-gloria/website_hero/9f5714075e63371d405759ee706fa7c8.jpg',
                  'website_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-gloria/website_main/4506d582488b0f812a2182ba5bc0f813.jpg',
                  'website_medium': 'https://assets-0.bloomandwild.com/letterbox-main/the-gloria/website_medium/d999c3a338aaec501d09033dfedd3da0.jpg',
                  'website_small': 'https://assets-0.bloomandwild.com/letterbox-main/the-gloria/website_small/f033bf929addf199881c153dfa56e89c.jpg',
                  'ios_upsell': '',
                  'android_carousel': [],
                  'android_main': '',
                  'android_thumb': '',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'badge': null,
                'unboxing_video_id': null,
                'arrangement_video_id': null,
                'tags': []
              },
              'in_stock': false,
              'next_available': '2016-02-03',
              'pricings': [
                {
                  'id': 169,
                  'sku_id': 25,
                  'quantity': 1,
                  'amount': '15.00',
                  'order_type': 'Subscription',
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 168,
                  'sku_id': 25,
                  'quantity': 3,
                  'amount': '50.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 167,
                  'sku_id': 25,
                  'quantity': 6,
                  'amount': '100.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 166,
                  'sku_id': 25,
                  'quantity': 12,
                  'amount': '195.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 165,
                  'sku_id': 25,
                  'quantity': 26,
                  'amount': '415.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 164,
                  'sku_id': 25,
                  'quantity': 52,
                  'amount': '795.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 163,
                  'sku_id': 25,
                  'quantity': 1,
                  'amount': '24.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                }
              ]
            },
            {
              'id': 13,
              'name': 'The Rosalind',
              'collection_id': 1,
              'default_bouquet_id': 49,
              'description': '',
              'slug': 'the-rosalind',
              'is_addon': false,
              'finlays_display_name': null,
              'weight': 1.1,
              'single_only': false,
              'bundle_only': false,
              'collection': null,
              'default_bouquet': {
                'id': 49,
                'name': 'The Rosalind',
                'description': 'This stunning bouquet of a dozen delicately pink roses is the perfect gift. Every stem is hand packed, with each head individually netted to protect every petal. \r\nSourced from specialist high-altitude growers, the roses are unusually large and long-lasting meaning your loved one will enjoy their gift for many days to come.',
                'instructions': 'Your Bloom & Wild bouquet was designed by our florist and prepared by hand for you. Introducing The Rosalind, a simply stunning display of 12 long-stemmed pink avalance roses. \r\nTo arrange The Rosalind, carefully remove the protective netting from each rose and diagonally trim the stems a few centimetres from the end.  \r\nYou may like to remove the outer \'guard\' petals too. This may not be necessary, but as these are the flower\'s own way of protecting the inner petals they are older than the rest. \r\nAt Bloom & Wild we love the simplicity of roses of the same height, but you might like to cut a few stems shorter to place at the front of the bouquet to create a graduated arrangement. \r\nThe head of each rose will continue to open out, but to enjoy your bouquet for as long as possible just trim the stems every few days.',
                'collection_id': 1,
                'weekly_bouquet': false,
                'starting_on': '2015-02-16',
                'ending_on': '2015-05-04',
                'appearing_from': '2015-02-15T15:30:00.000+00:00',
                'appearing_to': '2015-05-03T16:30:00.000+01:00',
                'slug': 'the-rosalind',
                'lily_free': false,
                'visible': true,
                'long_description': 'This stunning bouquet of a dozen delicately pink roses is the perfect gift. Every stem is hand packed, with each head individually netted to protect every petal. \r\nSourced from specialist high-altitude growers, the roses are unusually large and long-lasting meaning your loved one will enjoy their gift for many days to come.',
                'eighteen_plus': false,
                'substitute_bouquet_id': 124,
                'limited_edition': false,
                'supplier_id': 1,
                'contents': '',
                'image_urls': {
                  'ios_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-rosalind/iphone_carousel/2eb61a0244f8f8cdcdf20381d8b04353.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-rosalind/iphone_carousel/f10539012c6fdbe515f75b9917cb0295.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-rosalind/iphone_carousel/e1bd6d3f147d68e23c0a9270557a690d.jpg'
                  ],
                  'ios_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-rosalind/iphone_main/96fb2ecdd551084f637e8b3385d3204e.jpg',
                  'ios_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-rosalind/iphone_thumb/ad38cdc0337eeba8b2e73c81a3a27625.jpg',
                  'website_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-rosalind/website_carousel/66659655777de6b245e67bbbe8df5667.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-rosalind/website_carousel/0f3d790831045cf2510c0577cf2ee71b.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-rosalind/website_carousel/0598c60ca0a54eb269bf99319df878c7.jpg'
                  ],
                  'website_hero': '',
                  'website_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-rosalind/website_main/8028d94e6486a701aca2415e37df3e4b.jpg',
                  'website_medium': 'https://assets-0.bloomandwild.com/letterbox-main/the-rosalind/website_medium/cc98a41edc33b3b3e4dae99ad37a10cb.jpg',
                  'website_small': 'https://assets-0.bloomandwild.com/letterbox-main/the-rosalind/website_small/cda49f0fa53ba1c82c924ea6b33aa459.jpg',
                  'ios_upsell': '',
                  'android_carousel': [],
                  'android_main': '',
                  'android_thumb': '',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'image_urls_x2': {
                  'ios_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-rosalind/iphone_carousel/2eb61a0244f8f8cdcdf20381d8b04353.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-rosalind/iphone_carousel/f10539012c6fdbe515f75b9917cb0295.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-rosalind/iphone_carousel/e1bd6d3f147d68e23c0a9270557a690d.jpg'
                  ],
                  'ios_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-rosalind/iphone_main/96fb2ecdd551084f637e8b3385d3204e.jpg',
                  'ios_thumb': 'https://assets-0.bloomandwild.com/letterbox-main/the-rosalind/iphone_thumb/ad38cdc0337eeba8b2e73c81a3a27625.jpg',
                  'website_carousel': [
                    'https://assets-0.bloomandwild.com/letterbox-closeup/the-rosalind/website_carousel/66659655777de6b245e67bbbe8df5667.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-main/the-rosalind/website_carousel/0f3d790831045cf2510c0577cf2ee71b.jpg',
                    'https://assets-0.bloomandwild.com/letterbox-soft-vase/the-rosalind/website_carousel/0598c60ca0a54eb269bf99319df878c7.jpg'
                  ],
                  'website_hero': '',
                  'website_main': 'https://assets-0.bloomandwild.com/letterbox-main/the-rosalind/website_main/8028d94e6486a701aca2415e37df3e4b.jpg',
                  'website_medium': 'https://assets-0.bloomandwild.com/letterbox-main/the-rosalind/website_medium/cc98a41edc33b3b3e4dae99ad37a10cb.jpg',
                  'website_small': 'https://assets-0.bloomandwild.com/letterbox-main/the-rosalind/website_small/cda49f0fa53ba1c82c924ea6b33aa459.jpg',
                  'ios_upsell': '',
                  'android_carousel': [],
                  'android_main': '',
                  'android_thumb': '',
                  'android_upsell': '',
                  'website_upsell': ''
                },
                'badge': null,
                'unboxing_video_id': null,
                'arrangement_video_id': null,
                'tags': []
              },
              'in_stock': false,
              'next_available': '2016-02-03',
              'pricings': [
                {
                  'id': 87,
                  'sku_id': 13,
                  'quantity': 52,
                  'amount': '795.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 86,
                  'sku_id': 13,
                  'quantity': 26,
                  'amount': '415.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 85,
                  'sku_id': 13,
                  'quantity': 12,
                  'amount': '195.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 84,
                  'sku_id': 13,
                  'quantity': 6,
                  'amount': '100.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 83,
                  'sku_id': 13,
                  'quantity': 3,
                  'amount': '50.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 82,
                  'sku_id': 13,
                  'quantity': 1,
                  'amount': '24.00',
                  'order_type': null,
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                },
                {
                  'id': 81,
                  'sku_id': 13,
                  'quantity': 1,
                  'amount': '15.00',
                  'order_type': 'Subscription',
                  'as_addon_for_sku_id': null,
                  'remainder_amount': '0.0'
                }
              ]
            }
          ]
        }
      ]
    }
  }
}

flower.$inject = [];

export default flower
