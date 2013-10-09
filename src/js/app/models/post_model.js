App.Post = DS.Model.extend({
    blog_name: DS.attr('string'),
    post_url: DS.attr('string'),
    type: DS.attr('string'),
    timestamp: DS.attr('number'),
    format: DS.attr('string'),
    reblog_key: DS.attr('string', {defaultValue: null}),
    tags: DS.attr('array'),
    note_count: DS.attr('number'),

    is: function(){
        // anything other than our type that is requested returns undefined,
        // which, via the isTruthy mechanism, becomes false
        var types = {},
            type = this.get('type');
        types[type] = true;

        return types;
    }.property('type')
});
