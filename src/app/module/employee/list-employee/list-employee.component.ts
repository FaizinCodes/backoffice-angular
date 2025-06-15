import { Component } from '@angular/core';
import { TableComponent } from '../../../shared/component/table/table.component';
import { TableHeader } from '../../../shared/component/table/table-interface';

@Component({
  selector: 'app-list-employee',
  imports: [TableComponent],
  templateUrl: './list-employee.component.html',
})
export class ListEmployeeComponent {
  headers: TableHeader[] = [
    {
      title: 'Nama Pegawai',
      field: 'userName',
      fieldImage: 'image',
      fieldDescription: 'subText',
      type: 'text-image',
    },
    {
      title: 'Project Name',
      field: 'projectName',
      type: 'text',
    },
    {
      title: 'Status',
      field: 'status',
      type: 'badge',
    },
    {
      title: 'Budget',
      field: 'budget',
      type: 'text',
    },
  ];

  projects = [
    {
      image: '/assets/images/user/user-17.jpg',
      userName: 'Lindsey Curtis',
      subText: 'Web Designer',
      projectName: 'Agency Website',
      team: [
        { image: './images/user/user-22.jpg' },
        { image: './images/user/user-23.jpg' },
        { image: './images/user/user-24.jpg' },
      ],
      status: 'Active',
      budget: '3.9K',
      badge: 'success',
    },
    {
      image: '/assets/images/user/user-18.jpg',
      userName: 'Kaiya George',
      userRole: 'Project Manager',
      projectName: 'Technology',
      team: [{ image: './images/user/user-25.jpg' }, { image: './images/user/user-26.jpg' }],
      status: 'Pending',
      budget: '24.9K',
      badge: 'warning',
    },
    {
      image: '/assets/images/user/user-19.jpg',
      userName: 'Zain Geidt',
      userRole: 'Content Writer',
      projectName: 'Blog Writing',
      team: [{ image: './images/user/user-27.jpg' }],
      status: 'Active',
      budget: '12.7K',
      badge: 'success',
    },
    {
      image: '/assets/images/user/user-20.jpg',
      userName: 'Abram Schleifer',
      userRole: 'Digital Marketer',
      projectName: 'Social Media',
      team: [
        { image: './images/user/user-28.jpg' },
        { image: './images/user/user-29.jpg' },
        { image: './images/user/user-30.jpg' },
      ],
      status: 'Cancel',
      budget: '2.8K',
      badge: 'danger',
    },
    {
      image: '/assets/images/user/user-21.jpg',
      userName: 'Carla George',
      userRole: 'Front-end Developer',
      projectName: 'Website',
      team: [
        { image: './images/user/user-31.jpg' },
        { image: './images/user/user-32.jpg' },
        { image: './images/user/user-33.jpg' },
      ],
      status: 'Active',
      budget: '4.5K',
      badge: 'success',
    },
    {
      image: '/assets/images/user/user-17.jpg',
      userName: 'Lindsey Curtis',
      subText: 'Web Designer',
      projectName: 'Agency Website',
      team: [
        { image: './images/user/user-22.jpg' },
        { image: './images/user/user-23.jpg' },
        { image: './images/user/user-24.jpg' },
      ],
      status: 'Active',
      budget: '3.9K',
      badge: 'success',
    },
    {
      image: '/assets/images/user/user-18.jpg',
      userName: 'Kaiya George',
      userRole: 'Project Manager',
      projectName: 'Technology',
      team: [{ image: './images/user/user-25.jpg' }, { image: './images/user/user-26.jpg' }],
      status: 'Pending',
      budget: '24.9K',
      badge: 'warning',
    },
    {
      image: '/assets/images/user/user-19.jpg',
      userName: 'Zain Geidt',
      userRole: 'Content Writer',
      projectName: 'Blog Writing',
      team: [{ image: './images/user/user-27.jpg' }],
      status: 'Active',
      budget: '12.7K',
      badge: 'success',
    },
    {
      image: '/assets/images/user/user-20.jpg',
      userName: 'Abram Schleifer',
      userRole: 'Digital Marketer',
      projectName: 'Social Media',
      team: [
        { image: './images/user/user-28.jpg' },
        { image: './images/user/user-29.jpg' },
        { image: './images/user/user-30.jpg' },
      ],
      status: 'Cancel',
      budget: '2.8K',
      badge: 'danger',
    },
    {
      image: '/assets/images/user/user-21.jpg',
      userName: 'Carla George',
      userRole: 'Front-end Developer',
      projectName: 'Website',
      team: [
        { image: './images/user/user-31.jpg' },
        { image: './images/user/user-32.jpg' },
        { image: './images/user/user-33.jpg' },
      ],
      status: 'Active',
      budget: '4.5K',
      badge: 'success',
    },
  ];
}
