import React, { Component } from 'react';
import { observer } from 'mobx-react';
import MainStore from '../stores/MainStore'
import { Color } from '../theme/theme';
import IconButton from '@material-ui/core/IconButton';
import Share from '@material-ui/icons/Share';
import Tooltip from '@material-ui/core/Tooltip';
import {
    FacebookShareButton,
    FacebookIcon,
    GooglePlusShareButton,
    GooglePlusIcon,
    TwitterShareButton,
    TwitterIcon
} from 'react-share';

@observer
class SocialSharing extends Component {

    toggleSharing = () => MainStore.toggleSharing();

    getTopPosition = (el) => {
        if(el === 'fb') return 80;
        if(el === 'tw') return 119;
        if(el === 'gp') return 158;
    };

    getIconCss = (btn, el) => {
        if(btn === 'share') {
            return {
                position: 'absolute',
                top: this.getTopPosition(el),
                right: 80,
                cursor: 'pointer',
                zIndex: 2000,
                boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
                borderRadius: '50%'
            }
        } else {
            return {
                position: 'absolute',
                top: 30,
                right: 72,
                zIndex: 2000,
                backgroundColor: MainStore.showSharingIcons && Color.light_blue,
                color: MainStore.showSharingIcons && Color.white,
                borderRadius: '50%'
            }
        }
    };

    render() {
        const { showSharingIcons } = MainStore;
        const shareQuote = `Check out the Clinical Trials Transformation Initiative`;
        const shareUrl = `https://www.ctti-clinicaltrials.org/`;

        return (
            <div>
                <IconButton style={this.getIconCss()} onClick={() => this.toggleSharing()}>
                    <Tooltip title="Share" placement="bottom">
                        <Share />
                    </Tooltip>
                </IconButton>
                {showSharingIcons &&
                    <span>
                        <FacebookShareButton
                            url={shareUrl}
                            quote={shareQuote}
                            style={this.getIconCss('share','fb')}
                        >
                            <FacebookIcon size={32} round />
                        </FacebookShareButton>
                        <TwitterShareButton
                            url={shareUrl}
                            quote={shareQuote}
                            style={this.getIconCss('share','tw')}
                        >
                            <TwitterIcon size={32} round />
                        </TwitterShareButton>
                        <GooglePlusShareButton
                            url={shareUrl}
                            style={this.getIconCss('share','gp')}
                        >
                            <GooglePlusIcon size={32} round />
                        </GooglePlusShareButton>
                    </span>
                }
            </div>
        );
    }
}

export default SocialSharing;