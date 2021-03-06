App.PostMixin = Ember.Mixin.create({
    blog_name: DS.attr('string'),
    post_url: DS.attr('string'),
    type: DS.attr('string'),
    timestamp: DS.attr('timestamp'),
    date: DS.attr('string'),
    format: DS.attr('choice', {choices: ['html', 'markdown']}),
    reblog_key: DS.attr('string'),
    tags: DS.attr('array'),
    bookmarklet: DS.attr('boolean', {defaultValue: false}),
    mobile: DS.attr('boolean', {defaultValue: false}),
    source_url: DS.attr('string', {defaultValue: null}),
    source_title: DS.attr('string', {defaultValue: null}),
    liked: DS.attr('boolean'), //Indicates if a user has already liked a post or not Exists only if the request is fully authenticated with OAuth.
    state: DS.attr('choice', {choices: ['published', 'queued', 'draft', 'private']}),
    total_posts: DS.attr('number'), // The total number of post available for this request, useful for paginating through results
    note_count: DS.attr('number'),

    avatar_url: function(){
        return 'http://api.tumblr.com/v2/blog/%@.tumblr.com/avatar'.fmt(this.get('blog_name'))
    }.property('blog_name'),

    tooltip_tags: function(){
        return this.get('tags').join(', <br/>');
    }.property('tags'),

    tumblrized: function(){
        var out = {},
            self = this,
            blog_name = this.get('blog_name');

        this.eachAttribute(function(name, meta){
            if (meta.type === 'string')
                out[name] = App.utils._mend_url(self.get(name), blog_name);
        });

        return out;
    }.property().volatile(),

    is: function(){
        // anything other than our type that is requested returns undefined,
        // which, via the isTruthy mechanism, becomes false
        var types = {},
            type = this.get('type');
        types[type] = true;

        return types;
    }.property('type')
});
