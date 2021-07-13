import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Settings } from '../core/models/settings';
import { BaseSetting } from '../core/models/base-setting';
import { KeyService } from '../core/services/key.service';
import { SettingsService } from '../core/services/settings.service';
import { sortDistinct } from '../core/utils/CommonUtils';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

    public settings: Settings;

    constructor(
        public settingsService: SettingsService,
        private keyService: KeyService,
        private title: Title
    ) {
        this.title.setTitle(this.keyService.getKeyTranslation('s1'));
    }

    ngOnInit() {
        this.initSettings();
    }

    public getBaseSettingsList(): BaseSetting[] {
        const list: BaseSetting[] = [];
        Object.getOwnPropertyNames(this.settings)
            .map((e) => this.settings[e])
            .forEach((e) => {
                Object.getOwnPropertyNames(e).forEach((f) => list.push(e[f]));
            });
        return list;
    }

    public getBaseListCategories(): string[] {
        return this.getBaseSettingsList()
            .map((e) => e.category)
            .filter(sortDistinct);
    }

    public getBaseSettingsListByCategory(category: string): BaseSetting[] {
        return this.getBaseSettingsList().filter(
            (baseSetting) => baseSetting.category === category
        );
    }

    /**
     * Switch settings on and off when triggering the slider on the user
     * interface.
     *
     * @param setting The setting that will be triggered on the UI.
     * @param event The toggle event that indicates that the slider has changed
     * its internal value.
     */
    public toggleSlider(setting: BaseSetting) {
        setting.value = !setting.value;

        this.settingsService.settings.next(this.settings);
        this.settingsService.putSettings(this.settings).subscribe();
    }

    private initSettings() {
        this.settingsService.getSettings().subscribe((settings) => {
            this.settings = settings[0];
        });
    }
}
