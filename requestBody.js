function updateOrderMetaField(orderId, paymentResponseValue) {
    let query = `mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
                    metafieldsSet(metafields: $metafields) {
                        metafields {
                        key
                        namespace
                        value
                        createdAt
                        updatedAt
                        }
                        userErrors {
                        field
                        message
                        code
                        }
                    }
                }`

    let variables = {
        "metafields": [
            {
                "key": "payment_response",
                "namespace": "payment",
                "ownerId": "gid://shopify/Order/"+orderId,
                "type": "json",
                "value": paymentResponseValue
            }
        ]
    }
    return {
        query: query,
        variables: variables
    }
}

function updateOrderMetaObject(orderId, formFieldValue) {
    let query = `mutation UpsertMetaobject($handle: MetaobjectHandleInput!, $metaobject: MetaobjectUpsertInput!) {
                    metaobjectUpsert(handle: $handle, metaobject: $metaobject) {
                        metaobject {
                            id
                            handle
                            tin_number: field(key: "tin_number") {
                                value
                            }
                            order_id: field(key: "order_id") {
                                value
                            }
                        }
                        userErrors {
                            field
                            message
                            code
                        }
                    }
                }`

    let variables = {
        "handle": {
            "type": "order_invoice",
            "handle": orderId
        },
        "metaobject": {
            "capabilities" : {
                "publishable": {
                    "status": "ACTIVE"
                }
            },
            "fields": [
                {
                    "key": "tin_number",
                    "value": formFieldValue
                },
                {
                    "key": "order_id",
                    "value": orderId
                }
            ]
        }
    }

    return {
        query: query,
        variables: variables
    }
}
module.exports = {
    updateOrderMetaField: updateOrderMetaField,
    updateOrderMetaObject: updateOrderMetaObject
}