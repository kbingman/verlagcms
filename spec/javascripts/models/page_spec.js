describe("Pages", function () {
  
  var child_data = { 
    "admin_path":"/admin/pages/4e02f8a573c44f5f48000072", 
    "child?":true, 
    "children?":false, 
    "class_name":"Page",
    "contents":[{
      "admin_path":"/admin/pages/4e02f8a573c44f5f48000072/parts/4e45564873c44f11d4000066",
      "content":"content",
      "id":"4e45564873c44f11d4000066",
      "klass":"parts",
      "name":"body",
      "page_id":"4e02f8a573c44f5f48000072",
      "path":"/admin/pages/4e02f8a573c44f5f48000072/parts/4e45564873c44f11d4000066"
    }],
    "created_at":"2011-06-23T08:26:13Z",
    "id":"4e02f8a573c44f5f48000072",
    "layout_id":"4de21a9a73c44f09cb000001",
    "level":1,
    "padding":12,
    "parent_id":"4dbd057d73c44f67ac000001",
    "path":"/fifth-page/",
    "root?":false,
    "slug":"fifth-page",
    "tag_list":"",
    "title":"Fifth Page",
    "updated_at":"2011-10-09T10:14:12Z"
  };
  
  var page_data = { 
    "admin_path":"/admin/pages/4e02f8a573c44f5f48000072", 
    "child?":false, 
    "children?":true, 
    "class_name":"Page",
    "contents":[{
      "admin_path":"/admin/pages/4e02f8a573c44f5f48000072/parts/4e45564873c44f11d4000066",
      "content":"content",
      "id":"4e45564873c44f11d4000066",
      "klass":"parts",
      "name":"body",
      "page_id":"4e02f8a573c44f5f48000072",
      "path":"/admin/pages/4e02f8a573c44f5f48000072/parts/4e45564873c44f11d4000066"
    }],
    "created_at":"2011-06-23T08:26:13Z",
    "id":"4dbd057d73c44f67ac000001",
    "layout_id":"4de21a9a73c44f09cb000001",
    "level":0,
    "padding":0,
    "parent_id":null,
    "path":"/",
    "root?":true,
    "slug":"fifth-page",
    "tag_list":"",
    "title":"Root Page",
    "updated_at":"2011-10-09T10:14:12Z"
  };
  
  beforeEach(function () {
    this.child = new Verlag.Model.Page(child_data);
    this.page = new Verlag.Model.Page(page_data);
    Verlag.collections.pages = new Verlag.Collection.Pages(this.child, this.page);
  });
  
  it("creates a page from data", function () {
    expect(this.page.get('title')).toEqual('Root Page');
  });
  
  it("returns a url with a .json extension", function(){
    expect(this.page.url()).toEqual('/admin/pages/4dbd057d73c44f67ac000001.json');
  });
  
  // JSON
  it("returns a json string of the page with the children", function(){
    var json = this.page.toJSON();
    json['children'] = [this.child.to_json()];
    
    expect(this.page.to_json()).toEqual(json);
  });
  
  // Children
  it("returns a collection of children", function(){
    expect(this.page.children().first()).toEqual(this.child);
  });
  
  it("returns a json string of the children", function(){
    expect(this.page.children_to_json()).toEqual([this.child.to_json()])
  });
  
  // it('has a list of parts', function(){
  //   expect(this.page.get('contents').length).toEqual(1);
  // });
  
  // it('creates the page parts', function(){
  //   expect(this.page.parts().count()).toEqual(1);
  // });
  
  // it('finds a page by path, without trailing slash', function(){
  //   expect(Page.find_by_path('/fifth-page')).toEqual(this.page);
  // });
  
});

