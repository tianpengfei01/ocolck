// JavaScript Document
var FbcDigitBlocksView = function () {
    var _this = this;
    _this.blocksWrapper = document.createElement("span");
    _this.blocksWrapper.classList.add("fbc-digit-blocks");
    for (var i = 0; i < 15; i++) {
        var _block = document.createElement("span");
        _block.classList.add("fbc-block");
        _this.blocksWrapper.appendChild(_block);
    }

    /***
     * Update digit
     * @param Number digitValue
     */
    _this.blocksWrapper.setDigit = function (digitValue) {
        if(digitValue !== parseInt(_this.blocksWrapper.getAttribute("digit-value"))){
            _this.blocksWrapper.setAttribute("digit-value", digitValue);
        }
    };
    return _this.blocksWrapper;
};


var FbcDigitGroupView = function () {
    var _this = this;
    _this.groupWrapper = document.createElement("span");
    _this.groupWrapper.classList.add("fbc-digit-group");
    _this.tensDigit = new FbcDigitBlocksView();
    _this.unitsDigit = new FbcDigitBlocksView();

    _this.groupWrapper.appendChild(_this.tensDigit);
    _this.groupWrapper.appendChild(_this.unitsDigit);

    /***
     * Update digit
     * @param Number digitValue
     */
    _this.groupWrapper.updateTensDigit = function (digitValue) {
        _this.tensDigit.setDigit(digitValue);
    };

    /***
     * Update digit
     * @param Number digitValue
     */
    _this.groupWrapper.updateUnitsDigit = function (digitValue) {
        _this.unitsDigit.setDigit(digitValue);
    };

    return _this.groupWrapper;
};

var FbcDividerView = function () {
    var _this = this;
    _this.blocksWrapper = document.createElement("span");
    _this.blocksWrapper.classList.add("fbc-divider-blocks");

    for (var i = 0; i < 5; i++) {
        var _block = document.createElement("span");
        _block.classList.add("fbc-block");
        _this.blocksWrapper.appendChild(_block);
    }

    return _this.blocksWrapper;
};

var FbcFullLineDividerView = function(){
    var _this = this;
    _this.blocksWrapper = document.createElement("span");
    _this.blocksWrapper.classList.add("fbc-line-divider-blocks");

    for (var i = 0; i < 24; i++) {
        var _block = document.createElement("span");
        _block.classList.add("fbc-block");
        _this.blocksWrapper.appendChild(_block);
    }

    return _this.blocksWrapper;
};

var FbcClockView = function () {
    var _this = this;
    _this.mainWrapper = document.createElement("span");
    _this.mainWrapper.classList.add("fbc-clock-main-wrapper");

    _this.clockWrapper = document.createElement("span");
    _this.clockWrapper.classList.add("fbc-clock-wrapper");

    _this.hoursView = new FbcDigitGroupView();
    _this.minsView = new FbcDigitGroupView();
    _this.secsView = new FbcDigitGroupView();

    _this.clockWrapper.appendChild(new FbcDividerView());
    _this.clockWrapper.appendChild(new FbcDividerView());

    _this.clockWrapper.appendChild(_this.hoursView);
    _this.clockWrapper.appendChild(new FbcDividerView());

    _this.clockWrapper.appendChild(_this.minsView);
    _this.clockWrapper.appendChild(new FbcDividerView());

    _this.clockWrapper.appendChild(_this.secsView);

    _this.clockWrapper.appendChild(new FbcDividerView());
    _this.clockWrapper.appendChild(new FbcDividerView());

    /***
     * Updates whole time
     * @param Number hours
     * @param Number mins
     * @param Number secs
     */
    _this.mainWrapper.updateTime = function (hours, mins, secs) {
        if (isNaN(parseInt(('' + hours)[1]))) {
            _this.hoursView.updateTensDigit(0);
            _this.hoursView.updateUnitsDigit(parseInt(('' + hours)[0]));
        }
        else {
            _this.hoursView.updateTensDigit(parseInt(('' + hours)[0]));
            _this.hoursView.updateUnitsDigit(parseInt(('' + hours)[1]));
        }


        if (isNaN(parseInt(('' + mins)[1]))) {
            _this.minsView.updateTensDigit(0);
            _this.minsView.updateUnitsDigit(parseInt(('' + mins)[0]));
        }
        else {
            _this.minsView.updateTensDigit(parseInt(('' + mins)[0]));
            _this.minsView.updateUnitsDigit(parseInt(('' + mins)[1]));
        }


        if (isNaN(parseInt(('' + secs)[1]))) {
            _this.secsView.updateTensDigit(0);
            _this.secsView.updateUnitsDigit(parseInt(('' + secs)[0]));
        }
        else {
            _this.secsView.updateTensDigit(parseInt(('' + secs)[0]));
            _this.secsView.updateUnitsDigit(parseInt(('' + secs)[1]));
        }
    };

    _this.mainWrapper.appendChild(new FbcFullLineDividerView());
    _this.mainWrapper.appendChild(new FbcFullLineDividerView());
    _this.mainWrapper.appendChild(_this.clockWrapper);
    _this.mainWrapper.appendChild(new FbcFullLineDividerView());
    _this.mainWrapper.appendChild(new FbcFullLineDividerView());

    return _this.mainWrapper;
};

var FlipBlocksClock = function (container) {
    var _this = this;
    _this.clock = new FbcClockView();
    this.updateClock = function () {
        var _current = new Date();
        _this.clock.updateTime(_current.getHours(), _current.getMinutes(), _current.getSeconds());
    };
    container.classList.add("fbc-container");
    container.appendChild(_this.clock);

    setInterval(_this.updateClock, 1000);
};

var _fbc = new FlipBlocksClock(document.body);