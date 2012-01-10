describe('okzoom', function() {
  var img, lorgnette, imageUri = 'http://okfoc.us/assets/images/logo.gif';
  
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
    
    it('mouseover event updates lorgnette img', function () {
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
      expect(lorgnette.css('backgroundImage')).toBe('none')
    });
    
  });
});
