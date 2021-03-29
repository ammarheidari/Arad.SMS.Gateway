﻿(function (c, d) { var a = c.fn.wizard; var b = function (g, f) { var e; this.$element = c(g); this.options = c.extend({}, c.fn.wizard.defaults, f); this.options.disablePreviousStep = (this.$element.data().restrict === "previous") ? true : false; this.currentStep = this.options.selectedItem.step; this.numSteps = this.$element.find(".wizard-steps > li").length; this.$prevBtn = this.$element.find("button.btn-prev"); this.$nextBtn = this.$element.find("button.btn-next"); e = this.$nextBtn.children().detach(); this.nextText = c.trim(this.$nextBtn.text()); this.$nextBtn.append(e); this.$prevBtn.on("click", c.proxy(this.previous, this)); this.$nextBtn.on("click", c.proxy(this.next, this)); this.$element.on("click", "li.complete", c.proxy(this.stepclicked, this)); if (this.currentStep > 1) { this.selectedItem(this.options.selectedItem) } if (this.options.disablePreviousStep) { this.$prevBtn.attr("disabled", true); this.$element.find(".wizard-steps").addClass("previous-disabled") } this.$stepContainer = c(this.$element.data("target") || "body") }; b.prototype = { constructor: b, setState: function () { var o = (this.currentStep > 1); var p = (this.currentStep === 1); var e = (this.currentStep === this.numSteps); if (!this.options.disablePreviousStep) { this.$prevBtn.attr("disabled", (p === true || o === false)) } var i = this.$nextBtn.data(); if (i && i.last) { this.lastText = i.last; if (typeof this.lastText !== "undefined") { var m = (e !== true) ? this.nextText : this.lastText; var g = this.$nextBtn.children().detach(); this.$nextBtn.text(m).append(g) } } var k = this.$element.find(".wizard-steps > li"); k.removeClass("active").removeClass("complete"); k.find("span.badge").removeClass("badge-info").removeClass("badge-success"); var n = ".wizard-steps > li:lt(" + (this.currentStep - 1) + ")"; var h = this.$element.find(n); h.addClass("complete"); h.find("span.badge").addClass("badge-success"); var f = ".wizard-steps > li:eq(" + (this.currentStep - 1) + ")"; var l = this.$element.find(f); l.addClass("active"); l.find("span.badge").addClass("badge-info"); var j = l.data().target; this.$stepContainer.find(".step-pane").removeClass("active"); c(j).addClass("active"); this.$element.trigger("changed") }, stepclicked: function (j) { var g = c(j.currentTarget); var i = this.$element.find(".wizard-steps li").index(g); var f = true; if (this.options.disablePreviousStep) { if (i < this.currentStep) { f = false } } if (f) { var h = c.Event("stepclick"); this.$element.trigger(h, { step: i + 1 }); if (h.isDefaultPrevented()) { return } this.currentStep = (i + 1); this.setState() } }, previous: function () { var f = (this.currentStep > 1); if (this.options.disablePreviousStep) { f = false } if (f) { var g = c.Event("change"); this.$element.trigger(g, { step: this.currentStep, direction: "previous" }); if (g.isDefaultPrevented()) { return } this.currentStep -= 1; this.setState() } }, next: function () { var h = (this.currentStep + 1 <= this.numSteps); var f = (this.currentStep === this.numSteps); if (h) { var g = c.Event("change"); this.$element.trigger(g, { step: this.currentStep, direction: "next" }); if (g.isDefaultPrevented()) { return } this.currentStep += 1; this.setState() } else { if (f) { this.$element.trigger("finished") } } }, selectedItem: function (f) { var g, e; if (f) { e = f.step || -1; if (e >= 1 && e <= this.numSteps) { this.currentStep = e; this.setState() } g = this } else { g = { step: this.currentStep } } return g } }; c.fn.wizard = function (g) { var f = Array.prototype.slice.call(arguments, 1); var h; var e = this.each(function () { var k = c(this); var j = k.data("wizard"); var i = typeof g === "object" && g; if (!j) { k.data("wizard", (j = new b(this, i))) } if (typeof g === "string") { h = j[g].apply(j, f) } }); return (h === d) ? e : h }; c.fn.wizard.defaults = { selectedItem: { step: 1 } }; c.fn.wizard.Constructor = b; c.fn.wizard.noConflict = function () { c.fn.wizard = a; return this }; c(function () { c("body").on("mouseover.wizard.data-api", ".wizard", function () { var e = c(this); if (e.data("wizard")) { return } e.wizard(e.data()) }) }) })(window.jQuery);