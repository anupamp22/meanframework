//var services = angular.module('SparkAnalyticsApp.services', ['ngResource']);

var baseUrl = 'http://localhost\\:3000';

app.factory('factoryPost', function ($resource) {
    return $resource(baseUrl + '/dummy', {}, {
        getAll: { method: 'GET', params: {} }
    });
});

app.factory('factoryPost', function ($resource) {
    return $resource(baseUrl + '/posts', {}, 
    {
        getAll: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    });
});

app.factory('factoryPost', function ($resource) {
    return $resource(baseUrl + '/posts/:id', {}, 
    {
        getPostById: { method: 'GET' },
        updatePost: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    });
});