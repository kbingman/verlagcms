var assetData = {
  "created_at":"2011-10-09T19:24:48Z",
  "file_name":"Zooey Deschanel by Ellen von Unwerth 2.jpg",
  "id":"4e91f50073c44f517a00366a",
  "tag_list":"",
  "tags":["ellen", "woman"],
  "title":"Zooey Deschanel by Ellen von Unwerth 2"
}

describe("Asset", function () {
  
  beforeEach(function () {
    asset = new Asset(assetData);
    Asset.add(asset);
    this.asset = Asset.first();
  });
  
  it("creates a asset from data with a title", function () {
    expect(this.asset.attr('title')).toEqual('Zooey Deschanel by Ellen von Unwerth 2');
  });
  
  it("creates a asset from data with a filename", function () {
    expect(this.asset.attr('file_name')).toEqual('Zooey Deschanel by Ellen von Unwerth 2.jpg');
  });
  
  it("returns the tags", function(){
    expect(Asset.tags()).toEqual(["ellen", "woman"]);
  })
  
  it("returns a JSON object of itself", function(){
    expect(this.asset.asJSON()).toEqual(assetData);
  });
  
  it("returns a JSON object of itself for mustache templates", function(){
    assetData['query_path'] = '';
    expect(this.asset.toMustache()).toEqual(assetData);
  });
  
  it("returns a JSON object of all assets", function(){
    expect(Asset.asJSON()).toEqual([assetData]);
  })
  
});
