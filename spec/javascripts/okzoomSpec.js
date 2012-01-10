describe('okzoom', function() {
  var img, loupe,
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
      loupe = $('#ok-loupe');
      expect(loupe).toExist();
    });
    
    it('mouseover event gets loupe ready', function () {
      $('img').trigger('mouseover');
      expect(loupe).toHaveBackgroundImage();
    });

    it('mousemove event displays loupe', function () {
      $('img').trigger('mouseover');
      $('img').trigger('mousemove');
      expect(loupe).toBeVisible();
    });
    
    it('mouseout hides loupe', function () {
      $('img').trigger('mouseover');
      $('img').trigger('mousemove');
      $('img').trigger('mouseout');
      expect(loupe).toBeHidden();
      expect(loupe.css('backgroundImage')).toBe('none');
    });
  });

  describe('with data attribute set', function () {
    beforeEach(function(){
      img = $('img').data('okimage', altImageUri).okzoom();
      loupe = $('#ok-loupe');
      expect(loupe).toExist();
    });
    
    it('mouseover event gets loupe ready', function () {
      $('img').trigger('mouseover');
      expect(loupe).toHaveBackgroundImage();
      expect(loupe.css('backgroundImage')).toBe('url(' + altImageUri + ')');
      $('img').trigger('mouseout');
    });
  });

  describe('with image src change', function () {
    beforeEach(function(){
      img = $('img').okzoom();
      loupe = $('#ok-loupe');
      expect(loupe).toExist();
    });
    
    it('changing image src updates loupe', function () {
      $('img').trigger('mouseover');
      $('img').trigger('mousemove');
      expect(loupe.css('backgroundImage')).toBe('url(' + imageUri + ')');
      $('img').trigger('mouseout');
      $('img').attr('src', altImageUri);
      $('img').trigger('mouseover');
      expect(loupe.css('backgroundImage')).toBe('url(' + altImageUri + ')');
      $('img').trigger('mouseout');
    });
    
  });
});
