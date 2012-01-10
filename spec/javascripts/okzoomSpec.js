describe('okzoom', function() {
  var img, lorgnette,
  imageUri = 'http://okfoc.us/assets/images/logo.gif',
  altImageUri = 'http://okfoc.us/assets/images/ok_icon.png';
  
  beforeEach(function(){
    jasmine.getFixtures().set('<img src="' + imageUri + '">');
    this.addMatchers({
      toHaveBackgroundImage: function () {
        return /^url/.test(this.actual.css('backgroundImage'));
      },
      toBeVisible: function () {
        return this.actual.css('display') === "block";
      },
      toBeHidden: function () {
        return this.actual.css('display') === "none";
      },
    });
  });

  describe('with default options', function () {
    beforeEach(function(){
      img = $('img').okzoom();
      lorgnette = $('#ok-lorgnette');
      expect(lorgnette).toExist();
    });
    
    it('mouseover event gets lorgnette ready', function () {
      $('img').trigger('mouseover');
      expect(lorgnette).toHaveBackgroundImage();
    });

    it('mousemove event displays lorgnette', function () {
      $('img').trigger('mouseover');
      $('img').trigger('mousemove');
      expect(lorgnette).toBeVisible();
    });
    
    it('mouseout hides lorgnette', function () {
      $('img').trigger('mouseover');
      $('img').trigger('mousemove');
      $('img').trigger('mouseout');
      expect(lorgnette).toBeHidden();
      expect(lorgnette.css('backgroundImage')).toBe('none');
    });
  });

  describe('with data attribute set', function () {
    beforeEach(function(){
      img = $('img').data('okimage', altImageUri).okzoom();
      lorgnette = $('#ok-lorgnette');
      expect(lorgnette).toExist();
    });
    
    it('mouseover event gets lorgnette ready', function () {
      $('img').trigger('mouseover');
      expect(lorgnette).toHaveBackgroundImage();
      expect(lorgnette.css('backgroundImage')).toBe('url(' + altImageUri + ')');
      $('img').trigger('mouseout');
    });
  });

  describe('with image src change', function () {
    beforeEach(function(){
      img = $('img').okzoom();
      lorgnette = $('#ok-lorgnette');
      expect(lorgnette).toExist();
    });
    
    it('changing image src updates lorgnette', function () {
      $('img').trigger('mouseover');
      $('img').trigger('mousemove');
      expect(lorgnette.css('backgroundImage')).toBe('url(' + imageUri + ')');
      $('img').trigger('mouseout');
      $('img').attr('src', altImageUri);
      $('img').trigger('mouseover');
      expect(lorgnette.css('backgroundImage')).toBe('url(' + altImageUri + ')');
      $('img').trigger('mouseout');
    });
    
  });
});
