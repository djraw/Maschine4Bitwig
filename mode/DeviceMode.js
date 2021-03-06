

function DeviceMode (model)
{
    BaseMode.call (this, model);
    this.id = Maschine.MODE_BANK_DEVICE;
}
DeviceMode.prototype = new BaseMode ();

DeviceMode.prototype.onValueKnobTouch = function (index, isTouched)
{
    if (isTouched && this.surface.isPressed (MaschineButton.ERASE))
    {
        this.surface.setButtonConsumed (MaschineButton.ERASE);
        this.model.getCursorDevice ().resetParameter (index);
    }
};

DeviceMode.prototype.onValueKnob = function (index, value)
{
    var param = this.model.getCursorDevice ().getFXParam (index);
    param.value = this.surface.changeValue (value, param.value);
    this.model.getCursorDevice ().setParameter (index, param.value);
};

DeviceMode.prototype.onFirstRow = function (index)
{
//    println(index);
//    if (!this.surface.isSelectPressed ())
//        return;
//
//    var device = this.model.getCursorDevice ();
//    switch (index)
//    {
//        case 5:
//            if (device.hasPreviousParameterPage ())
//                device.previousParameterPage ();
//            break;
//
//        case 6:
//            if (device.hasNextParameterPage ())
//                device.nextParameterPage ();
//            break;
//
//        case 7:
//            device.toggleEnabledState ();
//            break;
//    }


//    switch (index)
//    {
//        case 0:
//            if (!event.isDown ())
//                return;
//
//            // TODO FIX The returned channel selection does not contain the layers instead it is the top level tracks selection
//            var cd = this.model.getCursorDevice ();
//            if (cd.hasSelectedDevice ())
//            {
//                cd.selectPrevious();
//                //if (cd.hasLayers ())
//                //    this.surface.setPendingMode (this.surface.getCurrentMode () == MODE_BANK_DEVICE ? MODE_DEVICE_LAYER : MODE_BANK_DEVICE);
//            }
//            else
//            {
//                //this.model.getCursorDevice ().cursorDevice.selectFirstInLayer (0);
//            }
//            break;
//
//        case 1:
//            if (!event.isDown ())
//                return;
//
//            device.selectNext();
//
//             // TODO Create function in CursorDeviceProxy when API is fully working and tested
//             //this.model.getCursorDevice ().cursorDevice.selectParent ();
//            break;
//
//        case 2:
//            this.doMacro();
//            break;
//
//        case 6:
//            if (device.hasPreviousParameterPage ())
//                device.previousParameterPage ();
//            break;
//
//        case 7:
//            if (device.hasNextParameterPage ())
//                device.nextParameterPage ();
//            break;
//
//        case 11:
//            device.toggleEnabledState ();
//            break;
//    }
};

DeviceMode.prototype.updateDisplay = function ()
{
    var d = this.surface.getDisplay ();
    d.clear ();

    if (this.model.hasSelectedDevice ())
    {
        var selectedDevice = this.model.getSelectedDevice ();
        var cursorDevice = this.model.getCursorDevice ();

//        if (!this.surface.isPressed (MaschineButton.SELECT))
//        {
            for (var i = 0; i < 8; i++)
            {
                var param = cursorDevice.getFXParam (i);
                var isEmpty = param.name.length == 0;
                d.setCell (0, i, param.name, Display.FORMAT_RAW)
                    .setCell (1, i, param.valueStr, Display.FORMAT_RAW);

                if (isEmpty)
                    d.clearCell (2, i);
                else
                    d.setCell (2, i, param.value, Display.FORMAT_VALUE);
            }
//        }
//        else
//        {
//            d.clear ();
//            d.setCell (0, 0, '      ')
//             .setCell (0, 1, '      ')
//             .setCell (0, 2, '      ')
//             .setCell (0, 3, '      ')
//             .setCell (0, 4, '      ')
//             .setCell (0, 5, cursorDevice.hasPreviousParameterPage () ? '< Prev' : '', Display.FORMAT_RAW)
//             .setCell (0, 6, cursorDevice.hasNextParameterPage () ? 'Next >' : '', Display.FORMAT_RAW)
//             .setCell (0, 7, selectedDevice.enabled ? 'Disabl' : 'Enable')
//
//            d.setCell (1, 0, 'Selctd', Display.FORMAT_RAW)
//                .setCell (1, 1, 'Dev  >:', Display.FORMAT_RAW);
//            d.setBlock(1, 1, selectedDevice.name);
//            d.setCell (1, 4, cursorDevice.getSelectedParameterPageName (), Display.FORMAT_RAW)
//        }


    }
    else
        d.clear ().setBlock (0, 0, 'Please select').setBlock (0, 1, 'a Device...    ');
    d.allDone ();

};

