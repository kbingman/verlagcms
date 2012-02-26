describe("Pages", function () {
  
  var page_data = [
    { 
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
    },
    { 
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
    }
  ];
  
  beforeEach(function () {
    this.pages = new Verlag.Collection.Pages(page_data);
    this.page = this.pages.first()
  });
  
  it("creates pages from data", function () {
    expect(this.pages.length).toEqual(2);
  });
  
  // Finding  
  it('finds the root page', function(){
    var root = this.pages.get('4dbd057d73c44f67ac000001');
    expect(this.pages.root()).toEqual(root);
  });

  it('finds a page by parent ID', function(){
    var page = this.pages.get('4e02f8a573c44f5f48000072');
    expect(this.pages.find_by_parent_id('4dbd057d73c44f67ac000001')).toEqual([page]);
  });

  it('finds a page by path', function(){
    var page = this.pages.get('4e02f8a573c44f5f48000072');
    expect(this.pages.find_by_path('/fifth-page/')).toEqual(page);
  });
  
});
