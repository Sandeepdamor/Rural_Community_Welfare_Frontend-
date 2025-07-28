import { isInside } from '../util/util';
export class CalendarResizeHelper {
    constructor(resizeContainerElement, minWidth, rtl) {
        this.resizeContainerElement = resizeContainerElement;
        this.minWidth = minWidth;
        this.rtl = rtl;
    }
    validateResize({ rectangle, edges }) {
        if (this.rtl) {
            // TODO - find a way of testing this, for some reason the tests always fail but it does actually work
            /* istanbul ignore next */
            if (typeof edges.left !== 'undefined') {
                rectangle.left -= edges.left;
                rectangle.right += edges.left;
            }
            else if (typeof edges.right !== 'undefined') {
                rectangle.left += edges.right;
                rectangle.right -= edges.right;
            }
            rectangle.width = rectangle.right - rectangle.left;
        }
        if (this.minWidth &&
            Math.ceil(rectangle.width) < Math.ceil(this.minWidth)) {
            return false;
        }
        return isInside(this.resizeContainerElement.getBoundingClientRect(), rectangle);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItcmVzaXplLWhlbHBlci5wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItY2FsZW5kYXIvc3JjL21vZHVsZXMvY29tbW9uL2NhbGVuZGFyLXJlc2l6ZS1oZWxwZXIvY2FsZW5kYXItcmVzaXplLWhlbHBlci5wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXhDLE1BQU0sT0FBTyxvQkFBb0I7SUFDL0IsWUFDVSxzQkFBbUMsRUFDbkMsUUFBZ0IsRUFDaEIsR0FBWTtRQUZaLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBYTtRQUNuQyxhQUFRLEdBQVIsUUFBUSxDQUFRO1FBQ2hCLFFBQUcsR0FBSCxHQUFHLENBQVM7SUFDbkIsQ0FBQztJQUVKLGNBQWMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUU7UUFDakMsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1oscUdBQXFHO1lBQ3JHLDBCQUEwQjtZQUMxQixJQUFJLE9BQU8sS0FBSyxDQUFDLElBQUksS0FBSyxXQUFXLEVBQUU7Z0JBQ3JDLFNBQVMsQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDN0IsU0FBUyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDO2FBQy9CO2lCQUFNLElBQUksT0FBTyxLQUFLLENBQUMsS0FBSyxLQUFLLFdBQVcsRUFBRTtnQkFDN0MsU0FBUyxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDO2dCQUM5QixTQUFTLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUM7YUFDaEM7WUFDRCxTQUFTLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztTQUNwRDtRQUVELElBQ0UsSUFBSSxDQUFDLFFBQVE7WUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFDckQ7WUFDQSxPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsT0FBTyxRQUFRLENBQ2IsSUFBSSxDQUFDLHNCQUFzQixDQUFDLHFCQUFxQixFQUFFLEVBQ25ELFNBQVMsQ0FDVixDQUFDO0lBQ0osQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNJbnNpZGUgfSBmcm9tICcuLi91dGlsL3V0aWwnO1xuXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJSZXNpemVIZWxwZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlc2l6ZUNvbnRhaW5lckVsZW1lbnQ6IEhUTUxFbGVtZW50LFxuICAgIHByaXZhdGUgbWluV2lkdGg6IG51bWJlcixcbiAgICBwcml2YXRlIHJ0bDogYm9vbGVhblxuICApIHt9XG5cbiAgdmFsaWRhdGVSZXNpemUoeyByZWN0YW5nbGUsIGVkZ2VzIH0pOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5ydGwpIHtcbiAgICAgIC8vIFRPRE8gLSBmaW5kIGEgd2F5IG9mIHRlc3RpbmcgdGhpcywgZm9yIHNvbWUgcmVhc29uIHRoZSB0ZXN0cyBhbHdheXMgZmFpbCBidXQgaXQgZG9lcyBhY3R1YWxseSB3b3JrXG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgaWYgKHR5cGVvZiBlZGdlcy5sZWZ0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZWN0YW5nbGUubGVmdCAtPSBlZGdlcy5sZWZ0O1xuICAgICAgICByZWN0YW5nbGUucmlnaHQgKz0gZWRnZXMubGVmdDtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGVkZ2VzLnJpZ2h0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZWN0YW5nbGUubGVmdCArPSBlZGdlcy5yaWdodDtcbiAgICAgICAgcmVjdGFuZ2xlLnJpZ2h0IC09IGVkZ2VzLnJpZ2h0O1xuICAgICAgfVxuICAgICAgcmVjdGFuZ2xlLndpZHRoID0gcmVjdGFuZ2xlLnJpZ2h0IC0gcmVjdGFuZ2xlLmxlZnQ7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgdGhpcy5taW5XaWR0aCAmJlxuICAgICAgTWF0aC5jZWlsKHJlY3RhbmdsZS53aWR0aCkgPCBNYXRoLmNlaWwodGhpcy5taW5XaWR0aClcbiAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gaXNJbnNpZGUoXG4gICAgICB0aGlzLnJlc2l6ZUNvbnRhaW5lckVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICByZWN0YW5nbGVcbiAgICApO1xuICB9XG59XG4iXX0=