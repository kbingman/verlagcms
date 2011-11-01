var pageData = { 
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

describe("Page", function () {
  
  beforeEach(function () {
    page = new Page(pageData);
    Page.add(page);
    this.page = Page.first();
  });
  
  it("creates a page from data", function () {
    expect(this.page.attr('title')).toEqual('Fifth Page');
  });
  
  it('has a list of parts', function(){
    expect(this.page.attr('contents').length).toEqual(1);
  });
  
  // it('creates the page parts', function(){
  //   expect(this.page.parts().count()).toEqual(1);
  // });
  
  // Finding
  it('finds the first page', function(){
    expect(Page.first()).toEqual(this.page);
  });
  
  it('finds a page by parent ID', function(){
    expect(Page.find_by_parent_id('4dbd057d73c44f67ac000001')).toEqual(this.page);
  });
  
  it('finds a page by path', function(){
    expect(Page.find_by_path('/fifth-page/')).toEqual(this.page);
  });
  
  // it('finds a page by path, without trailing slash', function(){
  //   expect(Page.find_by_path('/fifth-page')).toEqual(this.page);
  // });
  
});

