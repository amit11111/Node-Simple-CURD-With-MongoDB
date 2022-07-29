/* eslint-disable no-unused-vars */
/*
|----------------------------
| Import Base Lib
|----------------------------
|
|
*/
const Joi = require('joi');
const isBase64 = require('is-base64');

const { isset } = require(`${global.appRoot}/src/api/helpers/app.helper`);

module.exports = {
  Joi,
  CV: Joi.extend((joi) => ({
    type: 'th',
    base: joi.any(),
    messages: {
      'th.base': '{{#label}} must be required',
      'th.exists': 'The selected {{#label}} is invalid',
      'th.unique': 'The {{#label}} has already been taken.',
      'th.time': 'The {{#label}} has must be time formate HH:MM:SS (24H).',
      'th.objectId': 'The {{#label}} has must be Object-id.',
      'th.image.type': 'The {{#label}} has must be type jpg, jpeg, png.',
      'th.image.base64': 'The {{#label}} has must be pass in base64 string',
      'th.latitude': 'The {{#label}} has must be latitude.',
      'th.longitude': 'The {{#label}} has must be longitude.',
      'th.utcOffset': 'The {{#label}} has must be utc offset.',
      'th.price': 'The {{#label}} has must be price formate 9999.99.',
      'th.haxColor': 'The {{#label}} has must be hax code.',
    },
    rules: {
      unique: {
        multi: true, // Rule supports multiple invocations
        method(collection, filters) {
          return this.$_addRule({
            name: 'unique',
            args: { collection, filters },
          });
        },
        args: [
          {
            name: 'collection',
            ref: true,
            assert: (value) => isset(value),
            message: 'must be a required',
          },
          {
            name: 'filters',
            ref: true,
            assert: (value) => isset(value),
            message: 'must be a required',
          },
        ],
        // eslint-disable-next-line consistent-return
        async validate(value, helpers, args, options) {
          try {
            // eslint-disable-next-line no-console
            console.log('args filters ::: ', args.filters);
            // Only called when prefs.convert is false (due to rule convert option)
            const collection = args.collection;
            let filters = isset(args.filters) ? args.filters : {};
            filters = JSON.stringify(filters);
            filters = filters.replaceAll(
              '"@"',
              value.constructor === String ? `"${value}"` : value,
            );
            // eslint-disable-next-line no-console
            console.log('Encode filters :::: ', filters);
            filters = JSON.parse(filters);
            // eslint-disable-next-line no-console
            console.log('Decode filters :::: ', filters);

            // eslint-disable-next-line no-unused-expressions
            // eslint-disable-next-line arrow-body-style
            // const result = async () => {
            // eslint-disable-next-line no-return-await
            // eslint-disable-next-line no-unused-expressions
            // const result = (async () => {
            const result = await collection.findOne(filters);
            // if (getresult) {
            // 	return true;
            // }
            // return false;
            // }).then((getresult) => (!!(getresult)));
            // const result = collection.findOne(filters).exec()
            // 					// eslint-disable-next-line max-len
            // eslint-disable-next-line max-len
            // 					.then((collection_result) => { console.log('collection_result ::::: ', collection_result); return collection_result; })
            // eslint-disable-next-line max-len
            // 					.catch((err) => { console.log('collection_err ::::: ', err); return 'error occured'; });
            // eslint-disable-next-line no-console
            console.log('unique validation result ::: ', result);

            if (isset(result)) {
              // eslint-disable-next-line no-console
              console.log('in Error Condition :::: ');
              return helpers.error('th.unique');
            }
          } catch (error) {
            throw new Error(error);
          }
        },
      },
      time: {
        multi: true, // Rule supports multiple invocations
        method(collection, filters) {
          return this.$_addRule({ name: 'time' });
        },
        // eslint-disable-next-line consistent-return
        validate: (value, helpers, args, options) => {
          try {
            if (
              !/^(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)$/gm.test(
                value,
              )
            ) {
              return helpers.error('th.time');
            }
          } catch (error) {
            throw new Error(error);
          }
        },
      },
      objectId: {
        multi: true, // Rule supports multiple invocations
        method(collection, filters) {
          return this.$_addRule({ name: 'objectId' });
        },
        // eslint-disable-next-line consistent-return
        validate: (value, helpers, args, options) => {
          try {
            if (!/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i.test(value)) {
              return helpers.error('th.objectId');
            }
          } catch (error) {
            throw new Error(error);
          }
        },
      },
      image: {
        multi: true, // Rule supports multiple invocations
        method(collection, filters) {
          return this.$_addRule({ name: 'image' });
        },
        // eslint-disable-next-line consistent-return
        validate: (value, helpers, args, options) => {
          try {
            if (isset(value)) {
              if (isBase64(value, { allowMime: true })) {
                const mimeTypeCollection = [
                  'image/png',
                  'image/jpg',
                  'image/jpeg',
                ];
                const mimeType = value.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0];

                if (!mimeTypeCollection.includes(mimeType)) {
                  return helpers.error('th.image.type');
                }
              } else {
                return helpers.error('th.image.base64');
              }
            }
          } catch (error) {
            throw new Error(error);
          }
        },
      },
      latitude: {
        multi: true, // Rule supports multiple invocations
        method(collection, filters) {
          return this.$_addRule({ name: 'latitude' });
        },
        // eslint-disable-next-line consistent-return
        validate: (value, helpers, args, options) => {
          try {
            if (
              !/^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/.test(
                value,
              )
            ) {
              return helpers.error('th.latitude');
            }
          } catch (error) {
            throw new Error(error);
          }
        },
      },
      longitude: {
        multi: true, // Rule supports multiple invocations
        method(collection, filters) {
          return this.$_addRule({ name: 'longitude' });
        },
        // eslint-disable-next-line consistent-return
        validate: (value, helpers, args, options) => {
          try {
            if (
              !/^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/.test(
                value,
              )
            ) {
              return helpers.error('th.longitude');
            }
          } catch (error) {
            throw new Error(error);
          }
        },
      },
      utcOffset: {
        multi: true, // Rule supports multiple invocations
        method(collection, filters) {
          return this.$_addRule({ name: 'utcOffset' });
        },
        // eslint-disable-next-line consistent-return
        validate: (value, helpers, args, options) => {
          try {
            if (!/^(?:Z|[+-](?:2[0-3]|[01][0-9]):[0-5][0-9])$/.test(value)) {
              return helpers.error('th.utcOffset');
            }
          } catch (error) {
            throw new Error(error);
          }
        },
      },
      haxColor: {
        multi: true, // Rule supports multiple invocations
        method(collection, filters) {
          return this.$_addRule({ name: 'haxColor' });
        },
        // eslint-disable-next-line consistent-return
        validate: (value, helpers, args, options) => {
          try {
            if (!/^#([0-9A-F]{3}){1,2}$/i.test(value)) {
              return helpers.error('th.haxColor');
            }
          } catch (error) {
            throw new Error(error);
          }
        },
      },
      price: {
        multi: true, // Rule supports multiple invocations
        method(collection, filters) {
          return this.$_addRule({ name: 'price' });
        },
        // eslint-disable-next-line consistent-return
        validate: (value, helpers, args, options) => {
          try {
            if (!/^\d{0,4}(\.\d{1,2})?$/.test(value)) {
              return helpers.error('th.price');
            }
          } catch (error) {
            throw new Error(error);
          }
        },
      },
    },
  })),
};
