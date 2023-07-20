window.drupalSettings = {};
window.drupalSettings.convivialProfiler = {
  "site": "convivial-demo",
  "license_key": "community",
  "client_cleanup": true,
  "event_tracking": true,
  "config": {
    "profilers": {
      "set_param": {
        "name": "set_param",
        "label": "Set param",
        "weight": -17,
        "status": true,
        "description": "Saves \"set\" query parameter to storage.",
        "deferred": false,
        "sources": [
          {
            "type": "query",
            "param": "set"
          }
        ],
        "processors": [
          {
            "type": "temp",
            "storage_key": "set_param"
          }
        ],
        "destinations": [
          {
            "type": "set",
            "storage_key": "temp.set_param.value",
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          }
        ]
      },
      "unset_param": {
        "name": "unset_param",
        "label": "Unset param",
        "weight": -16,
        "status": true,
        "description": "Unsets \"unset\" query parameter from storage.",
        "deferred": false,
        "sources": [
          {
            "type": "query",
            "param": "unset"
          }
        ],
        "processors": [
          {
            "type": "temp",
            "storage_key": "unset_param"
          }
        ],
        "destinations": [
          {
            "type": "unset",
            "storage_key": "temp.unset_param.value",
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          }
        ]
      },
      "remove_param": {
        "name": "remove_param",
        "label": "Remove param",
        "weight": -15,
        "status": true,
        "description": "Removes \"remove\" query parameter from storage.",
        "deferred": false,
        "sources": [
          {
            "type": "query",
            "param": "remove"
          }
        ],
        "processors": [
          {
            "type": "temp",
            "storage_key": "remove_param"
          }
        ],
        "destinations": [
          {
            "type": "remove",
            "storage_keys": [
              "temp.remove_param.value"
            ],
            "static_values": [
              ""
            ],
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          }
        ]
      },
      "utm_campaign_param": {
        "name": "utm_campaign_param",
        "label": "UTM campaign param",
        "weight": -14,
        "status": true,
        "description": "Saves \"utm_campaign\" query parameter to storage and set dataLayer event.",
        "deferred": false,
        "sources": [
          {
            "type": "query",
            "param": "utm_campaign"
          }
        ],
        "processors": [
          {
            "type": "store",
            "storage_key": "utm_campaign_param",
            "ttl": 300
          }
        ],
        "destinations": [
          {
            "type": "datalayer_event",
            "category": "campaign",
            "action": "view",
            "normalize": true
          },
          {
            "type": "copy",
            "target_key": "campaign_utm",
            "remove_empty": true,
            "storage_key": "store.utm_campaign_param.value",
            "stringify": false,
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          }
        ]
      },
      "utm_source_param": {
        "name": "utm_source_param",
        "label": "UTM source param",
        "weight": -13,
        "status": true,
        "description": "Saves \"utm_source\" query parameter to storage.",
        "deferred": false,
        "sources": [
          {
            "type": "query",
            "param": "utm_source"
          }
        ],
        "processors": [
          {
            "type": "store",
            "storage_key": "utm_source_param",
            "ttl": 300
          }
        ],
        "destinations": [
          {
            "type": "copy",
            "target_key": "utm_source",
            "remove_empty": true,
            "storage_key": "store.utm_source_param.value",
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          }
        ]
      },
      "utm_medium_param": {
        "name": "utm_medium_param",
        "label": "UTM medium param",
        "weight": -12,
        "status": true,
        "description": "Saves \"utm_medium\" query parameter to storage.",
        "deferred": false,
        "sources": [
          {
            "type": "query",
            "param": "utm_medium"
          }
        ],
        "processors": [
          {
            "type": "store",
            "storage_key": "utm_medium_param",
            "ttl": 300
          }
        ],
        "destinations": [
          {
            "type": "copy",
            "target_key": "utm_medium",
            "remove_empty": true,
            "storage_key": "store.utm_medium_param.value",
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          }
        ]
      },
      "hour": {
        "name": "hour",
        "label": "Hour",
        "weight": -11,
        "status": true,
        "description": "",
        "deferred": false,
        "sources": [
          {
            "type": "time",
            "part": "hour"
          }
        ],
        "processors": [
          {
            "type": "store",
            "storage_key": "hour",
            "ttl": 3600
          }
        ],
        "destinations": [
          {
            "type": "range",
            "target_key": "daytime",
            "remove_empty": false,
            "storage_key": "store.hour.value",
            "ranges": [
              {
                "key": "daytime:morning",
                "min": 6,
                "max": 12
              },
              {
                "key": "daytime:afternoon",
                "min": 12,
                "max": 17
              },
              {
                "key": "daytime:evening",
                "min": 17,
                "max": 21
              },
              {
                "key": "daytime:night",
                "min": 0,
                "max": 6
              },
              {
                "key": "daytime:night",
                "min": 21,
                "max": 24
              }
            ],
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          },
          {
            "type": "copy",
            "target_key": "hour",
            "remove_empty": true,
            "storage_key": "store.hour.value",
            "stringify": false,
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          }
        ]
      },
      "type": {
        "name": "type",
        "label": "Type meta",
        "weight": -10,
        "status": true,
        "description": "Saves the \"type\" meta name to storage.",
        "deferred": false,
        "sources": [
          {
            "type": "meta",
            "attribute_name": "type"
          }
        ],
        "processors": [
          {
            "type": "dimension",
            "storage_key": "type",
            "normalize": true
          }
        ],
        "destinations": [
          {
            "type": "datalayer_event",
            "category": "type",
            "action": "view",
            "normalize": true
          },
          {
            "type": "top",
            "target_key": "type_top",
            "remove_empty": false,
            "dimension_key": "dimensions.type",
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          }
        ]
      },
      "audience_meta": {
        "name": "audience_meta",
        "label": "Audiences meta",
        "weight": -9,
        "status": true,
        "description": "Saves the \"audiences\" meta names to the audience dimension and calculates audience_top.",
        "deferred": false,
        "sources": [
          {
            "type": "meta",
            "attribute_name": "audience"
          }
        ],
        "processors": [
          {
            "type": "dimension",
            "storage_key": "audience",
            "normalize": true
          }
        ],
        "destinations": [
          {
            "type": "datalayer_event",
            "category": "audience",
            "action": "view",
            "normalize": true
          },
          {
            "type": "top",
            "target_key": "audience_top",
            "remove_empty": false,
            "dimension_key": "dimensions.audience",
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          }
        ]
      },
      "audience_param": {
        "name": "audience_param",
        "label": "Audience param",
        "weight": -8,
        "status": true,
        "description": "Saves the \"audience\" query param to storage.",
        "deferred": false,
        "sources": [
          {
            "type": "query",
            "param": "audience"
          }
        ],
        "processors": [
          {
            "type": "store",
            "storage_key": "audience_param",
            "ttl": 300
          }
        ],
        "destinations": [
          {
            "type": "copy",
            "target_key": "audience_param",
            "remove_empty": true,
            "storage_key": "store.audience_param.value",
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          }
        ]
      },
      "audience_recent": {
        "name": "audience_recent",
        "label": "Audience recent",
        "weight": -7,
        "status": true,
        "description": "Saves the \"audience_key\" to storage.",
        "deferred": false,
        "sources": [
          {
            "type": "meta",
            "attribute_name": "audience_key"
          }
        ],
        "processors": [
          {
            "type": "store",
            "storage_key": "audience_recent",
            "ttl": 300
          }
        ],
        "destinations": [
          {
            "type": "copy",
            "target_key": "audience_recent",
            "remove_empty": true,
            "storage_key": "store.audience_recent.value",
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          }
        ]
      },
      "audience_crm": {
        "name": "audience_crm",
        "label": "Audience CRM",
        "weight": -6,
        "status": true,
        "description": "Saves the \"audience_crm\" to storage.",
        "deferred": false,
        "sources": [
          {
            "type": "cookie",
            "name": "convivial_enricher_convivial_demo_audience"
          }
        ],
        "processors": [
          {
            "type": "store",
            "storage_key": "audience_crm",
            "ttl": 300
          }
        ],
        "destinations": [
          {
            "type": "copy",
            "target_key": "audience_crm",
            "remove_empty": true,
            "storage_key": "store.audience_crm.value",
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          }
        ]
      },
      "audience": {
        "name": "audience",
        "label": "Audience",
        "weight": -5,
        "status": true,
        "description": "Picks the best \"audience\".",
        "deferred": false,
        "sources": [],
        "processors": [],
        "destinations": [
          {
            "type": "bestpick",
            "target_key": "audience",
            "remove_empty": true,
            "storage_keys": [
              "audience_param",
              "audience_crm",
              "audience_recent",
              "audience_top"
            ],
            "default_value": "audience:general",
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          }
        ]
      },
      "campaign_param": {
        "name": "campaign_param",
        "label": "Campaign param",
        "weight": -4,
        "status": true,
        "description": "Saves the \"campaign\" query param to storage.",
        "deferred": false,
        "sources": [
          {
            "type": "query",
            "param": "campaign"
          }
        ],
        "processors": [
          {
            "type": "store",
            "storage_key": "campaign_param",
            "ttl": 300
          }
        ],
        "destinations": [
          {
            "type": "copy",
            "target_key": "campaign_param",
            "remove_empty": true,
            "storage_key": "store.campaign_param.value",
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          }
        ]
      },
      "campaign_crm": {
        "name": "campaign_crm",
        "label": "Campaign CRM",
        "weight": -3,
        "status": true,
        "description": "Saves the \"campaign_crm\" to storage.",
        "deferred": false,
        "sources": [
          {
            "type": "cookie",
            "name": "convivial_enricher_convivial_demo_campaign"
          }
        ],
        "processors": [
          {
            "type": "store",
            "storage_key": "campaign_crm",
            "ttl": 300
          }
        ],
        "destinations": [
          {
            "type": "copy",
            "target_key": "campaign_crm",
            "remove_empty": true,
            "storage_key": "store.campaign_crm.value",
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          }
        ]
      },
      "campaign": {
        "name": "campaign",
        "label": "Campaign",
        "weight": -2,
        "status": true,
        "description": "Picks the best \"campaign\".",
        "deferred": false,
        "sources": [],
        "processors": [],
        "destinations": [
          {
            "type": "bestpick",
            "target_key": "campaign",
            "remove_empty": true,
            "storage_keys": [
              "campaign_param",
              "campaign_crm",
              "campaign_utm"
            ],
            "default_value": "",
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          }
        ]
      },
      "topic_meta": {
        "name": "topic_meta",
        "label": "Topics meta",
        "weight": -1,
        "status": true,
        "description": "Saves the \"topics\" meta names to the topic dimension and calculates topic_top.",
        "deferred": false,
        "sources": [
          {
            "type": "meta",
            "attribute_name": "topic"
          }
        ],
        "processors": [
          {
            "type": "dimension",
            "storage_key": "topic",
            "normalize": true
          }
        ],
        "destinations": [
          {
            "type": "datalayer_event",
            "category": "topic",
            "action": "view",
            "normalize": true
          },
          {
            "type": "top",
            "target_key": "topic_top",
            "remove_empty": false,
            "dimension_key": "dimensions.topic",
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          }
        ]
      },
      "topic_param": {
        "name": "topic_param",
        "label": "Topic param",
        "weight": 0,
        "status": true,
        "description": "Saves the \"topic\" query param to storage.",
        "deferred": false,
        "sources": [
          {
            "type": "query",
            "param": "topic"
          }
        ],
        "processors": [
          {
            "type": "store",
            "storage_key": "topic_param",
            "ttl": 300
          }
        ],
        "destinations": [
          {
            "type": "copy",
            "target_key": "topic_param",
            "remove_empty": true,
            "storage_key": "store.topic_param.value",
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          }
        ]
      },
      "topic_recent": {
        "name": "topic_recent",
        "label": "Topic recent",
        "weight": 1,
        "status": true,
        "description": "Saves the \"topic_key\" to storage.",
        "deferred": false,
        "sources": [
          {
            "type": "meta",
            "attribute_name": "topic_key"
          }
        ],
        "processors": [
          {
            "type": "store",
            "storage_key": "topic_recent",
            "ttl": 300
          }
        ],
        "destinations": [
          {
            "type": "copy",
            "target_key": "topic_recent",
            "remove_empty": true,
            "storage_key": "store.topic_recent.value",
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          }
        ]
      },
      "topic_crm": {
        "name": "topic_crm",
        "label": "Topic CRM",
        "weight": 2,
        "status": true,
        "description": "Saves the \"topic_crm\" to storage.",
        "deferred": false,
        "sources": [
          {
            "type": "cookie",
            "name": "convivial_enricher_convivial_demo_topic"
          }
        ],
        "processors": [
          {
            "type": "store",
            "storage_key": "topic_crm",
            "ttl": 300
          }
        ],
        "destinations": [
          {
            "type": "copy",
            "target_key": "topic_crm",
            "remove_empty": true,
            "storage_key": "store.topic_crm.value",
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          }
        ]
      },
      "topic": {
        "name": "topic",
        "label": "Topic",
        "weight": 3,
        "status": true,
        "description": "Picks the best \"topic\".",
        "deferred": false,
        "sources": [],
        "processors": [],
        "destinations": [
          {
            "type": "bestpick",
            "target_key": "topic",
            "remove_empty": true,
            "storage_keys": [
              "topic_param",
              "topic_crm",
              "topic_recent",
              "topic_top"
            ],
            "default_value": "topic:general",
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          }
        ]
      },
      "intent_meta": {
        "name": "intent_meta",
        "label": "Intent meta",
        "weight": 4,
        "status": true,
        "description": "Saves the \"intent\" meta names to the intent dimension and calculates intent_top.",
        "deferred": false,
        "sources": [
          {
            "type": "meta",
            "attribute_name": "intent"
          }
        ],
        "processors": [
          {
            "type": "dimension",
            "storage_key": "intent",
            "normalize": true
          }
        ],
        "destinations": [
          {
            "type": "top",
            "target_key": "intent_top",
            "remove_empty": false,
            "dimension_key": "dimensions.intent",
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          }
        ]
      },
      "intent_param": {
        "name": "intent_param",
        "label": "Intent param",
        "weight": 5,
        "status": true,
        "description": "Saves the \"intent\" query param to storage.",
        "deferred": false,
        "sources": [
          {
            "type": "query",
            "param": "intent"
          }
        ],
        "processors": [
          {
            "type": "store",
            "storage_key": "intent_param",
            "ttl": 300
          }
        ],
        "destinations": [
          {
            "type": "copy",
            "target_key": "intent_param",
            "remove_empty": true,
            "storage_key": "store.intent_param.value",
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          }
        ]
      },
      "intent_recent": {
        "name": "intent_recent",
        "label": "Intent recent",
        "weight": -7,
        "status": true,
        "description": "Saves the \"intent_key\" to storage.",
        "deferred": false,
        "sources": [
          {
            "type": "meta",
            "attribute_name": "intent_key"
          }
        ],
        "processors": [
          {
            "type": "store",
            "storage_key": "intent_recent",
            "ttl": 300
          }
        ],
        "destinations": [
          {
            "type": "copy",
            "target_key": "intent_recent",
            "remove_empty": true,
            "storage_key": "store.intent_recent.value",
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          }
        ]
      },
      "intent_cookie": {
        "name": "intent_cookie",
        "label": "Intent cookie",
        "weight": 6,
        "status": true,
        "description": "Saves the \"intent\" cookie to storage.",
        "deferred": false,
        "sources": [
          {
            "type": "cookie",
            "name": "convivial_enricher_convivial_demo_intent"
          }
        ],
        "processors": [
          {
            "type": "store",
            "storage_key": "intent_cookie",
            "ttl": 300
          }
        ],
        "destinations": [
          {
            "type": "copy",
            "target_key": "intent_cookie",
            "remove_empty": true,
            "storage_key": "store.intent_cookie.value",
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          }
        ]
      },
      "intent": {
        "name": "intent",
        "label": "Intent",
        "weight": 7,
        "status": true,
        "description": "Picks the best \"intent\".",
        "deferred": false,
        "sources": [],
        "processors": [],
        "destinations": [
          {
            "type": "bestpick",
            "target_key": "intent",
            "remove_empty": true,
            "storage_keys": [
              "intent_param",
              "intent_cookie",
              "intent_recent"
            ],
            "default_value": "",
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          }
        ]
      },
      "intent_satisfied": {
        "name": "intent_satisfied",
        "label": "Intent satisfied meta",
        "weight": 0,
        "status": true,
        "description": "Unstores the \"intent_recent\" if there is a match.",
        "deferred": false,
        "sources": [
          {
            "type": "meta",
            "attribute_name": "intent_satisfied"
          }
        ],
        "processors": [
          {
            "type": "unstore_value",
            "storage_key": "intent_satisfied",
            "storage_value": "intent_recent",
            "unstore_key": "intent_recent"
          }
        ],
        "destinations": [
          {
            "type": "remove",
            "storage_keys": [
              "temp.intent_satisfied.value"
            ],
            "static_values": [
              ""
            ],
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          }
        ]
      },
      "next": {
        "name": "next",
        "label": "Next",
        "weight": 8,
        "status": true,
        "description": "Picks the next best step from intent, and campaign.",
        "deferred": false,
        "sources": [],
        "processors": [],
        "destinations": [
          {
            "type": "bestpick",
            "target_key": "next",
            "remove_empty": true,
            "storage_keys": [
              "intent",
              "campaign"
            ],
            "default_value": "",
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          }
        ]
      },
      "lifetime_value_meta": {
        "name": "lifetime_value_meta",
        "label": "Lifetime value meta",
        "weight": 9,
        "status": true,
        "description": "Increments lifetime_value from the \"lifetime_value\" meta name.",
        "deferred": false,
        "sources": [
          {
            "type": "meta",
            "attribute_name": "price"
          }
        ],
        "processors": [
          {
            "type": "accumulation",
            "storage_key": "lifetime_value_meta"
          }
        ],
        "destinations": [
          {
            "type": "copy",
            "target_key": "lifetime_value_meta",
            "remove_empty": false,
            "storage_key": "accumulators.lifetime_value_meta",
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          }
        ]
      },
      "goal": {
        "name": "goal",
        "label": "Goal",
        "weight": 10,
        "status": true,
        "description": "Saves the \"goal\" meta name to storage.",
        "deferred": false,
        "sources": [
          {
            "type": "meta",
            "attribute_name": "goal"
          }
        ],
        "processors": [
          {
            "type": "store",
            "storage_key": "goal",
            "ttl": -1
          }
        ],
        "destinations": [
          {
            "type": "flag",
            "storage_key": "store.goal.value",
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            },
            "flag_prefix": "",
            "flag_suffix": ":on"
          }
        ]
      },
      "device_type": {
        "name": "device_type",
        "label": "Device type",
        "weight": 11,
        "status": true,
        "description": "Saves the \"device_type\" user agent  to storage.",
        "deferred": false,
        "sources": [
          {
            "type": "httpuseragent",
            "key": "navigator.userAgent"
          }
        ],
        "processors": [
          {
            "type": "store",
            "storage_key": "device_type",
            "ttl": -1
          }
        ],
        "destinations": [
          {
            "type": "copy",
            "target_key": "device_type",
            "remove_empty": false,
            "storage_key": "store.device_type.value",
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          }
        ]
      },
      "location_country": {
        "name": "location_country",
        "label": "Location country",
        "weight": 12,
        "status": true,
        "description": "Saves the \"location_country\" cookie to storage.",
        "deferred": false,
        "sources": [
          {
            "type": "cookie",
            "name": "cp_country"
          }
        ],
        "processors": [
          {
            "type": "store",
            "storage_key": "location_country",
            "ttl": -1
          },
          {
            "type": "map",
            "storage_key": "location_zone",
            "default_value": "zone:australia",
            "fallback_value": "zone:international",
            "mappings": [
              "Australia|zone:australia",
              "AU|zone:australia"
            ]
          }
        ],
        "destinations": [
          {
            "type": "copy",
            "target_key": "location_country",
            "remove_empty": false,
            "storage_key": "store.location_country.value",
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          },
          {
            "type": "copy",
            "target_key": "location_zone",
            "remove_empty": true,
            "storage_key": "store.location_zone.value",
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          }
        ]
      },
      "location_lat": {
        "name": "location_lat",
        "label": "Location latitude",
        "weight": 13,
        "status": true,
        "description": "Saves the \"location_lat\" cookie to storage.",
        "deferred": false,
        "sources": [
          {
            "type": "cookie",
            "name": "cp_latitude"
          }
        ],
        "processors": [
          {
            "type": "store",
            "storage_key": "location_lat",
            "ttl": -1
          }
        ],
        "destinations": [
          {
            "type": "season",
            "target_key": "season",
            "remove_empty": false,
            "storage_key": "store.location_lat.value",
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          },
          {
            "type": "copy",
            "target_key": "location_lat",
            "remove_empty": false,
            "storage_key": "store.location_lat.value",
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          }
        ]
      },
      "location_lon": {
        "name": "location_lon",
        "label": "Location longitude",
        "weight": 14,
        "status": true,
        "description": "Saves the \"location_lon\" cookie to storage.",
        "deferred": false,
        "sources": [
          {
            "type": "cookie",
            "name": "cp_longitude"
          }
        ],
        "processors": [
          {
            "type": "store",
            "storage_key": "location_lon",
            "ttl": -1
          }
        ],
        "destinations": [
          {
            "type": "copy",
            "target_key": "location_lon",
            "remove_empty": false,
            "storage_key": "store.location_lon.value",
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          }
        ]
      },
      "location_city": {
        "name": "location_city",
        "label": "Location city",
        "weight": 15,
        "status": true,
        "description": "Saves the \"location_city\" cookie to storage.",
        "deferred": false,
        "sources": [
          {
            "type": "cookie",
            "name": "cp_city"
          }
        ],
        "processors": [
          {
            "type": "store",
            "storage_key": "location_city",
            "ttl": -1
          }
        ],
        "destinations": [
          {
            "type": "copy",
            "target_key": "location_city",
            "remove_empty": false,
            "storage_key": "store.location_city.value",
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          }
        ]
      },
      "pageview": {
        "name": "pageview",
        "label": "Pageview",
        "weight": 16,
        "status": true,
        "description": "Increments the \"pageview\" in storage.",
        "deferred": false,
        "sources": [],
        "processors": [
          {
            "type": "pageview",
            "storage_key": "pageview",
            "track": true,
            "log": false
          }
        ],
        "destinations": [
          {
            "type": "copy",
            "target_key": "visits",
            "remove_empty": false,
            "storage_key": "counters.pageview",
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          },
          {
            "type": "range",
            "target_key": "experience",
            "remove_empty": false,
            "storage_key": "counters.pageview",
            "ranges": [
              {
                "key": "experience:none",
                "min": 0,
                "max": 2
              },
              {
                "key": "experience:low",
                "min": 2,
                "max": 10
              },
              {
                "key": "experience:medium",
                "min": 10,
                "max": 100
              },
              {
                "key": "experience:high",
                "min": 100,
                "max": 1000000
              }
            ],
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          }
        ]
      },
      "searchquery": {
        "name": "searchquery",
        "label": "Searchquery",
        "weight": 17,
        "status": true,
        "description": "Tracks the searchquery in a log.",
        "deferred": false,
        "sources": [],
        "processors": [
          {
            "type": "searchquery",
            "storage_key": "searchquery",
            "search_path": "/search",
            "query_param": "keys",
            "exclude_param": "page",
            "size": 5,
            "track": false,
            "log": true
          }
        ],
        "destinations": [
          {
            "type": "copy",
            "target_key": "cp_search_log",
            "remove_empty": false,
            "storage_key": "log.searchquery",
            "stringify": true,
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          }
        ]
      },
      "language": {
        "name": "language",
        "label": "Language",
        "weight": 17,
        "status": true,
        "description": "Saves the browser \"language\" to storage.",
        "deferred": false,
        "sources": [
          {
            "type": "acceptlang",
            "key": "navigator.language"
          }
        ],
        "processors": [
          {
            "type": "language_simple",
            "storage_key": "language-simple",
            "ttl": -1
          },
          {
            "type": "language_full",
            "storage_key": "language-full",
            "ttl": -1
          }
        ],
        "destinations": [
          {
            "type": "copy",
            "target_key": "language",
            "remove_empty": false,
            "storage_key": "store.language-full.value",
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          }
        ]
      },
      "stage": {
        "name": "stage",
        "label": "Stage",
        "weight": 17,
        "status": true,
        "description": "Saves the \"stage\" meta name to the stage dimension and calculates threshold stage.",
        "deferred": false,
        "sources": [
          {
            "type": "meta",
            "attribute_name": "stage"
          }
        ],
        "processors": [
          {
            "type": "dimension",
            "storage_key": "stage",
            "normalize": false
          }
        ],
        "destinations": [
          {
            "type": "datalayer_event",
            "category": "stage",
            "action": "view",
            "normalize": true
          },
          {
            "type": "threshold",
            "target_key": "stage",
            "target_value": "stage:discovery",
            "storage_key": "dimensions.stage.stage:orientation",
            "threshold_number": 1,
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          },
          {
            "type": "threshold",
            "target_key": "stage",
            "target_value": "stage:validation",
            "storage_key": "dimensions.stage.stage:discovery",
            "threshold_number": 2,
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          },
          {
            "type": "threshold",
            "target_key": "stage",
            "target_value": "stage:conversion",
            "storage_key": "dimensions.stage.stage:validation",
            "threshold_number": 1,
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          },
          {
            "type": "threshold",
            "target_key": "stage",
            "target_value": "stage:continue",
            "storage_key": "dimensions.stage.stage:conversion",
            "threshold_number": 2,
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          },
          {
            "type": "threshold",
            "target_key": "stage",
            "target_value": "stage:continue",
            "storage_key": "dimensions.stage.stage:converted",
            "threshold_number": 1,
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          }
        ]
      },
      "styxkey_recombee_userid": {
        "name": "styxkey_recombee_userid",
        "label": "STYXKEY Recombee UserId",
        "weight": 17,
        "status": true,
        "description": "Copy RecombeeUserId cookie to STYXKEY_RecombeeUserId to support cookie reading on pantheon platform",
        "deferred": false,
        "sources": [
          {
            "type": "cookie",
            "name": "RecombeeUserId"
          }
        ],
        "processors": [
          {
            "type": "store",
            "storage_key": "RecombeeUserId",
            "ttl": 0
          }
        ],
        "destinations": [
          {
            "type": "copy",
            "target_key": "STYXKEY_RecombeeUserId",
            "remove_empty": true,
            "storage_key": "store.RecombeeUserId.value",
            "stringify": false,
            "target_location": {
              "localstorage": "0",
              "cookie": "cookie"
            }
          }
        ]
      },
      "convivial_enricher_clientid": {
        "name": "convivial_enricher_clientid",
        "label": "Convivial Enricher ClientId",
        "weight": 17,
        "status": true,
        "description": "Saves a client ID provided by Enricher.",
        "deferred": false,
        "sources": [
          {
            "type": "cookie",
            "name": "convivial_enricher_ConvivialEnricherClientId"
          }
        ],
        "processors": [
          {
            "type": "store",
            "storage_key": "convivial_enricher_clientid",
            "ttl": 0
          }
        ],
        "destinations": [
          {
            "type": "copy",
            "target_key": "ConvivialProfilerClientId",
            "remove_empty": false,
            "storage_key": "store.convivial_enricher_clientid.value",
            "target_location": {
              "localstorage": "0",
              "cookie": "cookie"
            }
          },
          {
            "type": "copy",
            "target_key": "RecombeeUserId",
            "remove_empty": false,
            "storage_key": "store.convivial_enricher_clientid.value",
            "target_location": {
              "localstorage": "0",
              "cookie": "cookie"
            }
          }
        ]
      },
      "newsletter_signup_form": {
        "name": "newsletter_signup_form",
        "label": "Newsletter signup form",
        "weight": 17,
        "status": true,
        "description": "Populate the newsletter signup form with hidden variables.",
        "deferred": false,
        "sources": [],
        "processors": [],
        "destinations": [
          {
            "type": "formfiller",
            "form_selector": ".newsletter-signup-form",
            "fields_selector": [
              "crm_signup_topic|topic",
              "crm_signup_audience|audience",
              "crm_signup_visits|visits",
              "crm_signup_country|location_country",
              "crm_signup_city|location_city"
            ],
            "storage_source": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          }
        ]
      },
      "convivial_enricher_cookies_remove": {
        "name": "convivial_enricher_cookies_remove",
        "label": "Convivial enricher cookies remove",
        "weight": 17,
        "status": true,
        "description": "Remove convivial_enricher_convivial_demo_topic, convivial_enricher_convivial_demo_audience, convivial_enricher_convivial_demo_campaign cookies.",
        "deferred": false,
        "sources": [],
        "processors": [],
        "destinations": [
          {
            "type": "remove",
            "storage_keys": [
              "store.topic_crm.value",
              "store.audience_crm.value",
              "store.campaign_crm.value"
            ],
            "static_values": [
              "convivial_enricher_convivial_demo_topic",
              "convivial_enricher_convivial_demo_audience",
              "convivial_enricher_convivial_demo_campaign"
            ],
            "target_location": {
              "localstorage": "0",
              "cookie": "cookie"
            }
          }
        ]
      },
      "office_hours": {
        "name": "office_hours",
        "label": "Office hours",
        "weight": 17,
        "status": true,
        "description": "Calculates whether the office is open based on current time and date.",
        "deferred": false,
        "sources": [],
        "processors": [],
        "destinations": [
          {
            "type": "officehours",
            "target_key": "office_open",
            "normal_start": "2023-04-03",
            "normal_end": "2023-10-01",
            "normal_offset": "+10",
            "daylight_saving_start": "2023-10-02",
            "daylight_saving_end": "2024-04-02",
            "daylight_saving_offset": "+11",
            "office_times": [
              {
                "day": 0,
                "start": 0,
                "close": 0
              },
              {
                "day": 1,
                "start": 9,
                "close": 17
              },
              {
                "day": 2,
                "start": 9,
                "close": 17
              },
              {
                "day": 3,
                "start": 9,
                "close": 17
              },
              {
                "day": 4,
                "start": 9,
                "close": 17
              },
              {
                "day": 5,
                "start": 9,
                "close": 17
              },
              {
                "day": 6,
                "start": 0,
                "close": 0
              }
            ],
            "target_location": {
              "localstorage": "localstorage",
              "cookie": "0"
            }
          }
        ]
      },
      "page_helpful": {
        "name": "page_helpful",
        "label": "Page helpful",
        "weight": 17,
        "status": true,
        "description": "Sends an event on form save to track the satisfaction of the user.",
        "deferred": false,
        "sources": [],
        "processors": [],
        "destinations": [
          {
            "type": "formtracker",
            "form_selector": ".webform-submission-is-helpful-form",
            "field_name": "is_helpful",
            "event_action": "formsubmit",
            "event_category": "page_helpful"
          }
        ]
      }
    }
  }
};